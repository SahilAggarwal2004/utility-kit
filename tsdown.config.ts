import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["src/index.ts", "src/lib/cache.ts", "src/lib/math.ts", "src/lib/random.ts", "src/lib/time.ts", "src/lib/utility.ts", "src/types.ts"],
    format: ["cjs", "es"],
    outExtensions: () => ({ dts: ".ts" }),
  },
]);
