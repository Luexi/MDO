import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

const site = process.env.PUBLIC_SITE_URL ?? "https://mdo-alpha.vercel.app";

export default defineConfig({
  site,
  output: "static",
  server: {
    host: true,
    port: 8080,
  },
  integrations: [react(), tailwind()],
});
