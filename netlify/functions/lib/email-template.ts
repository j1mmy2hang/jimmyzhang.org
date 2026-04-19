/**
 * Wraps newsletter HTML content in an email template
 * matching the jimmyzhang.org aesthetic.
 */

import { markdownToHtml, parseFrontmatter } from './markdown';

interface EmailOptions {
  markdown: string;
  slug: string;
  unsubscribeUrl: string;
  webUrl: string;
}

export function buildEmailHtml(options: EmailOptions): { html: string; subject: string } {
  const { frontmatter, body } = parseFrontmatter(options.markdown);
  const title = frontmatter.title || 'Newsletter';
  const created = frontmatter.created || '';
  const contentHtml = markdownToHtml(body);

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <title>${title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Libre+Bodoni:wght@400&display=swap" rel="stylesheet">
  <!--[if mso]>
  <style>body{font-family:Georgia,'Times New Roman',serif;}</style>
  <![endif]-->
  <style>
    :root { color-scheme: light only; }
    [data-ogsc] body, [data-ogsb] body { background-color: #FFFCF0 !important; color: #100F0F !important; }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#FFFCF0;color:#100F0F;font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:1.65;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FFFCF0;">
    <tr>
      <td align="center" style="padding:48px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Breadcrumb -->
          <tr>
            <td style="padding-bottom:40px;font-size:14px;">
              <a href="https://jimmyzhang.org" style="font-family:'Libre Bodoni',Georgia,'Times New Roman',serif;color:#B7B5AC;text-decoration:none;">Jimmy Zhang</a>
              <span style="color:#B7B5AC;"> / </span>
              <a href="https://jimmyzhang.org/newsletter" style="color:#B7B5AC;text-decoration:none;">newsletter</a>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding-bottom:8px;">
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:700;line-height:1.25;color:#100F0F;letter-spacing:0;">${title}</h1>
            </td>
          </tr>

          ${created ? `
          <!-- Date -->
          <tr>
            <td style="padding-bottom:32px;">
              <span style="font-size:14px;color:#B7B5AC;">${formatDate(created)}</span>
            </td>
          </tr>` : ''}

          <!-- Content -->
          <tr>
            <td style="padding:8px 0 40px;color:#100F0F;font-size:18px;line-height:1.65;">
              ${contentHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0;border-top:1px solid #E6E4D9;">
              <p style="margin:0 0 8px;font-size:14px;line-height:1.5;">
                <a href="${options.webUrl}" style="color:#B7B5AC;text-decoration:none;">Read online</a>
                <span style="color:#DAD8CE;"> · </span>
                <a href="${options.unsubscribeUrl}" style="color:#B7B5AC;text-decoration:none;">Unsubscribe</a>
              </p>
              <p style="margin:0;font-size:14px;color:#B7B5AC;line-height:1.5;">
                You're receiving this because you subscribed at jimmyzhang.org.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { html, subject: title };
}

function formatDate(s: string): string {
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}
