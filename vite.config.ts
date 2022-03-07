import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svg from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [react(), svg()],
  build: { sourcemap: true },
  test: {
    include: ["src/**/__tests__/*"],
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests.ts",
    clearMocks: true,
  },
}));
