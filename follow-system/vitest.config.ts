import { defineConfig, type Plugin } from "vitest/config";
import path from "path";
import fs from "fs";

function resolveJsToTs(): Plugin {
    return {
        name: "resolve-js-to-ts",
        resolveId(id, importer) {
            if (!id.endsWith(".js") || !importer) return null;
            const tsPath = path.resolve(path.dirname(importer), id.replace(/\.js$/, ".ts"));
            if (fs.existsSync(tsPath)) return tsPath;
            return null;
        },
    };
}

export default defineConfig({
    plugins: [resolveJsToTs()],
    test: {
        environment: "node",
        include: ["tests/**/*.test.ts"],
        testTimeout: 30000,
        hookTimeout: 30000,
        reporters: ["verbose"],
    },
});
