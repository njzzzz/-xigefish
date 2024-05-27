import { TLibs, getCommonConfig } from "../config/common-config";
import { build } from "../config/rollup.config";
import { Plugin } from "rollup";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { buildDirResolve } from "../utils/path";
import { COMPONENTS_BUILD_IGNORE } from "../utils/constants";
import { rimrafSync } from "rimraf";
const entry = (process.env.ENTRY_MODULE || "") as TLibs;
console.log("entry", entry);
const BASE = `../packages/${entry}`; // CIP_CODE_MIRROR_BASE
const TARGET = `${BASE}/esm`;
const INPUT = buildDirResolve(`${BASE}/src`);

rimrafSync(buildDirResolve(TARGET));

const external = peerDepsExternal({
  packageJsonPath: buildDirResolve(`${BASE}/package.json`),
  includeDependencies: true,
}) as Plugin;

const config = getCommonConfig({
  entry
});

export default build({
  inputDir: INPUT,
  distEsmPath: TARGET,
  ignore: COMPONENTS_BUILD_IGNORE,
  plugins: [external, ...config.plugins],
  externals: [...config.external, /\.+\//],
  moduleSideEffects: true,
});
