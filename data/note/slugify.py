#!/usr/bin/env python3
"""
slugify.py — placed at data/note/

Comprehensive, reusable note slugifier.

Usage:
    python3 slugify.py [--dry-run] [--links-only]

Phases:
  1. RENAME — for every .md file under note/ (recursively):
       • Add `title:` frontmatter if missing  (value = current filename w/o .md)
       • Skip rename if filename is already a valid slug
       • Skip rename if filename contains Chinese characters  (frontmatter still added)
       • Otherwise: slugify the name and rename the file
  2. LINKS  — walk every .md file in the entire data/ tree and rewrite
       [[Old Title]] → [[new-slug]] using the title→slug mapping built in phase 1

Flags:
  --dry-run     Preview all changes; nothing is written to disk
  --links-only  Skip phase 1 (rename); only run the link-update phase.
                Reads title frontmatter from already-renamed files to build the map.

"Already sluggified" means the stem (filename without .md) consists entirely of
lowercase ASCII letters, digits, and hyphens — e.g. the-creative-act, index, ai-agent.
"""

import os
import re
import sys

# ── paths ─────────────────────────────────────────────────────────────────────

NOTE_DIR  = os.path.dirname(os.path.abspath(__file__))   # …/data/note/
DATA_ROOT = os.path.dirname(NOTE_DIR)                     # …/data/

DRY_RUN    = "--dry-run"    in sys.argv
LINKS_ONLY = "--links-only" in sys.argv

# ── regexes ───────────────────────────────────────────────────────────────────

# A valid slug: lowercase alphanumeric + hyphens, no leading/trailing hyphen
SLUG_RE = re.compile(r'^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$')

# Obsidian wikilink:  [[target]]  [[target|alias]]  [[target#head]]  [[target#head|alias]]
# Group 1 = link target (file ref), Group 2 = rest (#heading and/or |alias)
WIKILINK_RE = re.compile(r'\[\[([^\]|#\n]+?)((?:[#|][^\]\n]*)?)\]\]')

# ── helpers ───────────────────────────────────────────────────────────────────

def is_slugified(stem: str) -> bool:
    """True if stem is already a valid slug (nothing to do)."""
    return bool(SLUG_RE.match(stem))


def has_chinese(text: str) -> bool:
    for ch in text:
        cp = ord(ch)
        if (0x4E00 <= cp <= 0x9FFF or
            0x3400 <= cp <= 0x4DBF or
            0xF900 <= cp <= 0xFAFF or
            0x3000 <= cp <= 0x303F or
            0xFF00 <= cp <= 0xFFEF):
            return True
    return False


def slugify(text: str) -> str:
    s = text
    s = s.replace("--",  "-")
    s = s.replace("&",   "and")
    s = s.replace("+",   "and")
    s = s.replace(">",   "over")
    s = s.replace("<",   "under")
    s = s.replace("=",   "equals")
    s = s.replace("≠",   "not-equal")
    s = s.replace("≥",   "gte")
    s = s.replace("≤",   "lte")
    s = s.replace("×",   "times")
    s = s.replace("÷",   "div")
    s = s.replace(".",   "-")    # dots become hyphens (skill.md → skill-md)
    s = s.lower()
    s = re.sub(r"[^\w\s-]", "",  s)   # drop everything except word chars, spaces, hyphens
    s = re.sub(r"\s+",       "-", s)   # spaces → hyphens
    s = re.sub(r"-{2,}",     "-", s)   # collapse runs
    s = s.strip("-")
    return s


def yaml_encode_title(title: str) -> str:
    """Return a safely double-quoted YAML string for the title field."""
    escaped = title.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'


def extract_title(content: str):
    """Extract the value of `title:` from YAML frontmatter, or None."""
    if not content.startswith("---"):
        return None
    end = content.find("---", 3)
    if end == -1:
        return None
    for line in content[3:end].splitlines():
        if line.startswith("title:"):
            val = line[6:].strip()
            if len(val) >= 2 and val[0] == '"' and val[-1] == '"':
                val = val[1:-1].replace('\\"', '"').replace("\\\\", "\\")
            elif len(val) >= 2 and val[0] == "'" and val[-1] == "'":
                val = val[1:-1]
            return val
    return None


def add_title_frontmatter(filepath: str, title: str, dry_run: bool = False) -> bool:
    """Prepend or inject `title:` into frontmatter. Returns True if file was changed."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    if content.startswith("---"):
        end = content.find("---", 3)
        if end != -1:
            if "title:" in content[3:end]:
                return False                           # already has title
            fm_body = content[3:end]
            after   = content[end + 3:]
            new_content = f"---\ntitle: {yaml_encode_title(title)}\n{fm_body}---{after}"
        else:
            new_content = f"---\ntitle: {yaml_encode_title(title)}\n---\n\n{content}"
    else:
        new_content = f"---\ntitle: {yaml_encode_title(title)}\n---\n\n{content}"

    if not dry_run:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
    return True


def iter_note_files():
    """Yield absolute paths of all .md files under NOTE_DIR, excluding index.md."""
    for dirpath, dirnames, filenames in os.walk(NOTE_DIR):
        # Skip hidden dirs
        dirnames[:] = [d for d in dirnames if not d.startswith(".")]
        for fname in sorted(filenames):
            if fname.endswith(".md") and fname.lower() != "index.md":
                yield os.path.join(dirpath, fname)


def iter_all_md_files():
    """Yield absolute paths of all .md files under NOTE_DIR (for link scanning)."""
    for dirpath, dirnames, filenames in os.walk(NOTE_DIR):
        dirnames[:] = [d for d in dirnames if not d.startswith(".")]
        for fname in sorted(filenames):
            if fname.endswith(".md"):
                yield os.path.join(dirpath, fname)


# ── phase 1: rename ───────────────────────────────────────────────────────────

def phase_rename():
    """
    Returns mapping {original_title: new_slug} for every file that was (or
    would be) renamed.  Also adds frontmatter to every file that lacks it.
    """
    mapping   = {}   # original stem → slug stem
    stats = {
        "frontmatter_added":    0,
        "frontmatter_skipped":  0,
        "renamed":              0,
        "already_slug":         0,
        "chinese_skipped":      0,
        "conflicts":            [],
    }

    for filepath in iter_note_files():
        stem = os.path.basename(filepath)[:-3]    # filename without .md

        # ── frontmatter ──
        fm_added = add_title_frontmatter(filepath, stem, dry_run=DRY_RUN)
        if fm_added:
            stats["frontmatter_added"] += 1
        else:
            stats["frontmatter_skipped"] += 1

        # ── rename decision ──
        if is_slugified(stem):
            stats["already_slug"] += 1
            continue

        if has_chinese(stem):
            stats["chinese_skipped"] += 1
            continue

        new_stem     = slugify(stem)
        new_filename = new_stem + ".md"
        new_filepath = os.path.join(os.path.dirname(filepath), new_filename)

        if new_stem == stem:
            stats["already_slug"] += 1
            continue

        if os.path.exists(new_filepath):
            stats["conflicts"].append((os.path.relpath(filepath, DATA_ROOT),
                                       new_filename))
            continue

        mapping[stem] = new_stem

        if DRY_RUN:
            rel = os.path.relpath(filepath, DATA_ROOT)
            print(f"  RENAME  {rel}\n      --> {new_filename}")
        else:
            os.rename(filepath, new_filepath)

        stats["renamed"] += 1

    return mapping, stats


# ── phase 2: links ────────────────────────────────────────────────────────────

def build_mapping_from_frontmatter():
    """
    Build {original_title: current_slug} by reading title: frontmatter from
    every already-renamed note file.  Used in --links-only mode.
    """
    mapping = {}
    for filepath in iter_note_files():
        slug = os.path.basename(filepath)[:-3]
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        title = extract_title(content)
        if title and title != slug:
            mapping[title] = slug
    return mapping


def phase_links(mapping: dict):
    """Rewrite [[wikilinks]] across all data/ files using the given mapping."""
    stats = {"files_changed": 0, "links_changed": 0}

    for filepath in iter_all_md_files():
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        hits = []

        def replace(m, _hits=hits):
            target = m.group(1).strip()
            rest   = m.group(2)
            if target in mapping:
                _hits.append((target, mapping[target]))
                return f"[[{mapping[target]}{rest}]]"
            return m.group(0)

        new_content = WIKILINK_RE.sub(replace, content)

        if hits:
            stats["files_changed"] += 1
            stats["links_changed"] += len(hits)
            rel = os.path.relpath(filepath, DATA_ROOT)
            if DRY_RUN:
                print(f"\n  LINKS  {rel}  ({len(hits)} changes)")
                for old, new in hits[:6]:
                    print(f"    [[{old}]]  →  [[{new}]]")
                if len(hits) > 6:
                    print(f"    … +{len(hits) - 6} more")
            else:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(new_content)

    return stats


# ── main ──────────────────────────────────────────────────────────────────────

def main():
    mode = "[DRY RUN] " if DRY_RUN else ""

    if LINKS_ONLY:
        print(f"{mode}Building mapping from existing frontmatter…")
        mapping = build_mapping_from_frontmatter()
        print(f"  {len(mapping)} renamed files in mapping.\n")
        lstats = phase_links(mapping)
        print(f"\n{mode}Links done.")
        print(f"  Files with updated links : {lstats['files_changed']}")
        print(f"  Total links updated      : {lstats['links_changed']}")
        return

    # ── phase 1 ──
    print(f"{mode}Phase 1 — rename…")
    mapping, rstats = phase_rename()

    print(f"\n{mode}Rename summary:")
    print(f"  Frontmatter added    : {rstats['frontmatter_added']}")
    print(f"  Frontmatter existed  : {rstats['frontmatter_skipped']}")
    print(f"  Files renamed        : {rstats['renamed']}")
    print(f"  Already sluggified   : {rstats['already_slug']}")
    print(f"  Chinese (skipped)    : {rstats['chinese_skipped']}")
    if rstats["conflicts"]:
        print(f"  Conflicts ({len(rstats['conflicts'])}) — not renamed:")
        for src, dst in rstats["conflicts"]:
            print(f"    {src} → {dst}")

    # ── phase 2 ──
    print(f"\n{mode}Phase 2 — update links…")
    lstats = phase_links(mapping)
    print(f"\n{mode}Links summary:")
    print(f"  Files with updated links : {lstats['files_changed']}")
    print(f"  Total links updated      : {lstats['links_changed']}")


if __name__ == "__main__":
    main()
