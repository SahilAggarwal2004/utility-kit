import { defineConfig } from "tsup";

export default defineConfig([
  {
    bundle: true,
    clean: true,
    dts: false,
    entry: ["src/index.ts", "src/lib/cache.ts", "src/lib/math.ts", "src/lib/random.ts", "src/lib/time.ts", "src/lib/utility.ts"],
    format: ["cjs"],
    outDir: "dist/cjs",
    splitting: false,
    treeshake: "recommended",
  },
  {
    bundle: true,
    clean: true,
    dts: true,
    entry: ["src/index.ts", "src/lib/cache.ts", "src/lib/math.ts", "src/lib/random.ts", "src/lib/time.ts", "src/lib/utility.ts", "src/types.ts"],
    format: ["esm"],
    outDir: "dist/esm",
    splitting: true,
    treeshake: "recommended",
  },
]);
