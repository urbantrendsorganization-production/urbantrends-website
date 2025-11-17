import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
const fetch = globalThis.fetch || (async (...args) => (await import("node-fetch")).default(...args));

const baseUrl = "https://urbantrends.dev";

async function generateSitemap() {
  const stream = new SitemapStream({ hostname: baseUrl });

  // Static pages
  const staticPages = [
    "/",
    "/about",
    "/services[slug]",
    "/products[slug]",
    "/order",
    "/portfolio",
    "/contact",
    "/privacy-policy",
    "/terms"
  ];

  staticPages.forEach((url) => stream.write({ url }));

  // Fetch dynamic service routes
  const res = await fetch("https://api.urbantrends.dev/v2/api/services");
  const services = await res.json();

  services.forEach((srv) => {
    stream.write({
      url: `/services/${srv.title.toLowerCase().replace(/\s+/g, "-")}`,
    });
  });

  stream.end();

  const sitemap = await streamToPromise(stream);
  createWriteStream("./public/sitemap.xml").write(sitemap);
}

generateSitemap();
