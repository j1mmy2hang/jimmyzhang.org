import type { Context } from "https://edge.netlify.com";

const AGENT_UA =
  /(Claude|GPTBot|ChatGPT|anthropic|Perplexity|CCBot|Applebot-Extended|Google-Extended|Meta-ExternalAgent|Bytespider|cohere-ai|DuckAssistBot|Amazonbot|AI2Bot|iaskspider|YouBot)/i;

const SECTIONS = new Set([
  "self",
  "telos",
  "note",
  "project",
  "writing",
  "photo",
]);

export default async (req: Request, _ctx: Context) => {
  const ua = req.headers.get("user-agent") || "";
  const accept = req.headers.get("accept") || "";
  const isAgent =
    AGENT_UA.test(ua) || accept.includes("text/markdown");

  if (!isAgent) return;  // humans pass through untouched

  const url = new URL(req.url);
  const p = url.pathname;

  // Already has a file extension — let Netlify serve it as-is
  if (/\.[a-z0-9]+$/i.test(p)) return;

  // Root → entry map
  if (p === "/" || p === "") {
    return Response.redirect(new URL("/jimmyzhang.md", url), 308);
  }

  // Normalize: strip trailing slash
  const clean = p.replace(/\/+$/, "");
  const parts = clean.split("/").filter(Boolean);

  // /section → /section/index.md
  if (parts.length === 1 && SECTIONS.has(parts[0])) {
    return Response.redirect(new URL(`/${parts[0]}/index.md`, url), 308);
  }

  // /section/page → /section/page.md
  if (parts.length >= 2 && SECTIONS.has(parts[0])) {
    return Response.redirect(new URL(`${clean}.md`, url), 308);
  }

  // Anything else (assets, etc.) — pass through
  return;
};

export const config = { path: "/*" };
