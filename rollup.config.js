import typescript from "@wessberg/rollup-plugin-ts";
import resolve from "@rollup/plugin-node-resolve";
import cleanup from "rollup-plugin-cleanup";

import pkg from "./package.json";

const extensions = [".ts"];

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "umd",
        name: "LazyIterableLib",
      },
      {
        file: pkg.module,
        format: "es",
      },
    ],
    plugins: [resolve({ extensions }), typescript(), cleanup({ extensions, comments: "none", sourcemap: false })],
  },
];
