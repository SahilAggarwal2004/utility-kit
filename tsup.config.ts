import { defineConfig } from "tsup";

export default defineConfig([
  {
    bundle: true,
    clean: true,
    dts: false,
    entry: ["src/index.ts", "src/cache.ts", "src/math.ts", "src/random.ts", "src/time.ts", "src/utility.ts"],
    format: ["cjs"],
    outDir: "dist/cjs",
    splitting: false,
    treeshake: "recommended",
  },
  {
    bundle: true,
    clean: true,
    dts: true,
    entry: ["src/index.ts", "src/cache.ts", "src/math.ts", "src/random.ts", "src/time.ts", "src/utility.ts"],
    format: ["esm"],
    outDir: "dist/esm",
    splitting: true,
    treeshake: "recommended",
  },
]);
