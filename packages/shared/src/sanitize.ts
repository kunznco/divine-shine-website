/**
 * Minimal HTML sanitizer for the static sample.
 *
 * All rich-text on this site is authored in-repo (trusted), so this strips the
 * obviously-dangerous tags (script/style/iframe/event handlers) without
 * pulling in a full sanitizer dependency. If user-generated HTML is ever
 * rendered, replace this with the `sanitize-html` package.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<\s*(script|style|iframe)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}
