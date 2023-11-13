import { defineConfig, mergeConfig } from "vitest/config"
import viteConfig from "./vite.config"

export default mergeConfig(viteConfig, defineConfig({
  test: {
    globals: true,
    setupFiles: "./setupTests.ts",
    coverage: {
        all: true,
        skipFull: false,
        include: ["**/*.tsx"],
        exclude: ["**/testing"],
        provider: "v8",
        reporter: ["text", "json"],
        reportsDirectory: "./src/testing/coverage"
    },
    environment: "jsdom"
  }
}))