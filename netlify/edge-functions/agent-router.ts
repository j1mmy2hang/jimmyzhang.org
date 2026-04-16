import type { Context } from "https://edge.netlify.com";

// Known agent User-Agent patterns
const AGENT_UA =
  /(Claude|GPTBot|ChatGPT|anthropic|Perplexity|CCBot|Applebot-Extended|Google-Extended|Meta-ExternalAgent|Bytespider|cohere-ai|DuckAssistBot|Amazonbot|AI2Bot|iaskspider|YouBot)/i;

const SECTIONS = new Set(["self", "telos", "note", "project", "writing", "photo"]);

function isAgent(req: Request): boolean {
  const ua = req.headers.get("user-agent") || "";
  const accept = req.headers.get("accept") || "";
  return AGENT_UA.test(ua) || accept.includes("text/markdown");
}

function redirect(url: URL, path: string): Response {
  return Response.redirect(new URL(path, url), 308);
}

// Netlify's SPA fallback serves index.html for missing paths with status 200
// and _headers forces text/plain on /*.md — so the only reliable signal is the body.
async function isRealMarkdown(res: Response): Promise<[boolean, string]> {
  const body = await res.text();
  const isHTML = body.trimStart().startsWith("<!DOCTYPE") || body.trimStart().startsWith("<html");
  return [!isHTML, body];
}

export default async (req: Request, ctx: Context) => {
  if (!isAgent(req)) return;

  const url = new URL(req.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";

  // Root → agent entry map
  if (path === "/") return redirect(url, "/jimmyzhang.md");

  // Non-.md file extension → pass through (images, css, js, etc.)
  if (/\.[a-z0-9]+$/i.test(path) && !/\.md$/i.test(path)) return;

  // Resolve the .md URL the agent is trying to reach
  const parts = path.split("/").filter(Boolean);
  const mdPath = path.endsWith(".md")
    ? path                                          // already explicit: /self/skills.md
    : parts.length === 1 && SECTIONS.has(parts[0])
      ? `/${parts[0]}/index.md`                     // bare section: /self → /self/index.md
      : SECTIONS.has(parts[0])
        ? `${path}.md`                              // section/page: /self/basics → /self/basics.md
        : null;

  if (!mdPath) return;

  // Try serving the resolved path; fall back to /note/atomic/ if it doesn't exist
  const res = await ctx.next({ sendConditionalRequest: true });
  if (res.status === 404) return redirect(url, `/note/atomic/${mdPath.split("/").pop()}`);

  const [real, body] = await isRealMarkdown(res);
  if (!real) return redirect(url, `/note/atomic/${mdPath.split("/").pop()}`);

  // If we resolved a bare path to .md, redirect so the agent sees the canonical URL
  if (!path.endsWith(".md")) return redirect(url, mdPath);

  // Real .md at the requested path — serve it
  return new Response(body, { status: res.status, headers: res.headers });
};

export const config = { path: "/*" };
