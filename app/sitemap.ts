import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://promptotheque-gpt.netlify.app/",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
