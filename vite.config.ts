
import { defineConfig } from "vite";

import {
  sallaTransformPlugin,
  sallaBuildPlugin,
  sallaDemoPlugin,
} from "@salla.sa/twilight-bundles/vite-plugins";

export default defineConfig({
  plugins: [
    {
      name: "fix-salla-windows-preview",
      apply: "serve",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const match = req.url?.match(
            /^\/@fs[A-Za-z]:\/.*?(\/src\/components\/.*)$/
          );

          if (match) {
            req.url = match[1];
          }

          next();
        });
      },
    },
    sallaTransformPlugin(),
    sallaBuildPlugin(),
    sallaDemoPlugin(),
  ],
});
