import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://karvi-ten.vercel.app";

  const staticRoutes = ["/", "/favorites"];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
    .map(
      (route) => `
    <url>
      <loc>${baseUrl}${route}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}