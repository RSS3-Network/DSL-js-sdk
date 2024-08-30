import { type Options, defineConfig } from "tsup";

const commonConfig: Options = {
	entry: ["./src/**"],
	outDir: "dist",
	clean: true,
	sourcemap: true,
	treeshake: true,
};

export default defineConfig((options) => [
	{
		...commonConfig,
		format: ["cjs", "esm"],
		platform: "node",
		dts: options.dts,
		target: "node16.14",
	},
	{
		...commonConfig,
		format: ["iife"],
		globalName: "DslApiCore",
		minify: !options.watch,
		platform: "browser",
		dts: false,
		target: "es2020",
	},
]);
