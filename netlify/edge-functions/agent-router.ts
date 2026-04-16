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

export default async (req: Request, ctx: Context) => {
  const ua = req.headers.get("user-agent") || "";
  const accept = req.headers.get("accept") || "";
  const isAgent =
    AGENT_UA.test(ua) || accept.includes("text/markdown");

  if (!isAgent) return;  // humans pass through untouched

  const url = new URL(req.url);
  const p = url.pathname;

  // .md request — try to serve; if it fell through to the SPA fallback
  // (returns index.html instead of real markdown), redirect to note/atomic.
  // The _headers rule forces text/plain on /*.md even for the SPA fallback,
  // so we sniff the first bytes of the body instead.
  if (/\.md$/i.test(p)) {
    const res = await ctx.next();
    if (res.status === 404) {
      const slug = p.split("/").pop();
      return Response.redirect(new URL(`/note/atomic/${slug}`, url), 308);
    }
    const body = await res.text();
    if (body.trimStart().startsWith("<!DOCTYPE") || body.trimStart().startsWith("<html")) {
      const slug = p.split("/").pop();
      return Response.redirect(new URL(`/note/atomic/${slug}`, url), 308);
    }
    // Real .md file — reconstruct the response with the original body
    return new Response(body, {
      status: res.status,
      headers: res.headers,
    });
  }
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
