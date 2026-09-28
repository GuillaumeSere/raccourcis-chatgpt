import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://promptotheque-gpt.netlify.app/sitemap.xml",
    host: "https://promptotheque-gpt.netlify.app",
  };
}
