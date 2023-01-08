import propertiesService from "../../services/properties.service";

const buildSitemapXml = (fields) => {
  const content = fields
    .map((fieldData) => {
      const field = Object.entries(fieldData).map(([key, value]) => {
        if (!value) return "";
        return `<${key}>${value}</${key}>`;
      });

      return `<url>${field.join("")}</url>\n`;
    })
    .join("");

  return withXMLTemplate(content);
};

const withXMLTemplate = (content) => {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n${content}
  <url>
<loc>https://www.hcmut-bkblog.tech</loc>
<lastmod>2022-12-31T08:35:19.685Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.7</priority>
</url>
<url>
<loc>https://www.hcmut-bkblog.tech/about</loc>
<lastmod>2022-12-31T08:35:19.685Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.7</priority>
</url>
<url>
<loc>https://www.hcmut-bkblog.tech/active-account</loc>
<lastmod>2022-12-31T08:35:19.685Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.7</priority>
</url>
<url>
<loc>https://www.hcmut-bkblog.tech/create-post</loc>
<lastmod>2022-12-31T08:35:19.685Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.7</priority>
</url>
<url>
<loc>https://www.hcmut-bkblog.tech/help</loc>
<lastmod>2022-12-31T08:35:19.685Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.7</priority>
</url>
<url>
<loc>https://www.hcmut-bkblog.tech/news-feeds</loc>
<lastmod>2022-12-31T08:35:19.685Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.7</priority>
</url>
<url>
<loc>https://www.hcmut-bkblog.tech/vlog</loc>
<lastmod>2022-12-31T08:35:19.685Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.7</priority>
</url></urlset>`;
};
export const getServerSideProps = async ({ res }) => {
  const data = await propertiesService
    .getArticles()
    .then((data) => data.data.data);

  const transformedData = data.reduce((filtered, articles) => {
    filtered.push({
      loc: process.env.REACT_APP_BASE_URL + `/post/${articles.id}`,
      lastmod: articles.updatedAt || undefined,
      priority: 0.7,
      changefreq: "daily",
    });

    return filtered;
  }, []);

  const sitemapContent = buildSitemapXml(transformedData);

  /**  Set Cache Control in vercel @see https://vercel.com/docs/edge-network/caching#stale-while-revalidate */
  res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate");

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemapContent);

  res.end();

  // Empty since we don't render anything
  return {
    props: {},
  };
};

// Default export to prevent next.js errors
const SitemapXML = () => {
  return null;
};

export default SitemapXML;
