import { Plugin } from "rollup";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import esbuild from "rollup-plugin-esbuild";
import resolverExtension from "../rollup-plugins/rollup-plugin-resolver-extension";
import dts from "vite-plugin-dts";
import { buildDirResolve } from "../utils/path";
export type TLibs = "cip-utils" | "cip-request" | "cip-hooks" | "xdp/button" | "xdp/utils" | "xdp/store" | "xdp/config";
export const getCommonConfig = ({ entry }: { entry: TLibs }) => {
  const config = {
    define: {
      __VUE_PROD_DEVTOOLS__: false,
    },
    resolve: {},
    plugins: [
      vue({
        isProduction: true,
        template: {
          compilerOptions: {
            isCustomElement: (tag) => /^micro-app/.test(tag),
          },
        },
      }) as Plugin,
      vueJsx() as Plugin,
      resolverExtension(),
      commonjs(),
      nodeResolve(),
      esbuild({
        target: "es6",
      }),
    ],
    external: [
      /^@xigefish/,
      /^codemirror/,
      /^vant/
    ],
  };
  // 需要生成dts的库
  const needGenDtsLib = ["cip-utils", "cip-request", "cip-hooks", "xdp/button", "xdp/utils", "xdp/store", "xdp/config"];
  if (needGenDtsLib.includes(entry)) {
    config.plugins.push(
      dts({
        tsconfigPath: buildDirResolve(`../packages/${entry}/tsconfig.json`),
        root: buildDirResolve(`../packages/${entry}`),
        copyDtsFiles: true,
        entryRoot: buildDirResolve(`../packages/${entry}/src`),
      })
    );
  }
  return config;
};

// xxx.js
// xxx.min.js
