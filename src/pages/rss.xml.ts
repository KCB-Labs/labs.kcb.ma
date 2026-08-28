import type { APIRoute } from 'astro';
import { getArticles } from '../lib/content/articles.js';

export const GET: APIRoute = () => {
  const articles = getArticles();

  const items = articles
    .filter((a) => a.data.publishedAt)
    .map((article) => {
      const pubDate = article.data.publishedAt as string;
      const category = article.data.category as string | undefined;
      return `
    <item>
      <title><![CDATA[${article.data.title as string}]]></title>
      <description><![CDATA[${article.data.description as string}]]></description>
      <link>https://labs.kcb.ma/journal/${article.slug}/</link>
      <guid isPermaLink="true">https://labs.kcb.ma/journal/${article.slug}/</guid>
      <pubDate>${new Date(pubDate).toUTCString()}</pubDate>
      ${category ? `<category>${category}</category>` : ''}
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>KCB Labs Journal</title>
    <description>Articles, insights, and updates from KCB Labs — turning ideas into experiments, validated projects, and real-world outcomes.</description>
    <link>https://labs.kcb.ma/journal/</link>
    <atom:link href="https://labs.kcb.ma/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
};
