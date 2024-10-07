import fs from "node:fs/promises";
import path from "node:path";
import * as core from "@rss3/api-core";

const __dirname = new URL(".", import.meta.url).pathname;

// clean up the src/hooks directory
const hookDir = path.join(__dirname, "../src/hooks");
await fs.rm(hookDir, { recursive: true, force: true });
await fs.mkdir(hookDir, { recursive: true });

const indexContentArr = [];
for (const [fnName, fn] of Object.entries(core)) {
	const hookName = `use${fnName.charAt(0).toUpperCase() + fnName.slice(1)}`;
	const hookNameKebab = hookName
		.replace(/([a-z])([A-Z])/g, "$1-$2")
		.toLowerCase();

	const template = `
import { ${fnName} } from "@rss3/api-core";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export function ${hookName}(
  params:
    | Parameters<typeof ${fnName}>
    | Parameters<typeof ${fnName}>[0],
  options?: Omit<UseQueryOptions<ReturnType<typeof ${fnName}>>, "queryKey" | "queryFn">
) {
  const queryKey = ["${hookName}", params];
  const query = useQuery({
    queryKey,
    queryFn: () => {
      const args = Array.isArray(params) ? params : [params];
      return ${fnName}(
        ...(args as Parameters<typeof ${fnName}>),
      );
    },
    ...options,
  });
  return {
    ...query,
    queryKey,
  };
};
`.trimStart();

	fs.writeFile(path.join(hookDir, `${hookNameKebab}.ts`), template);
	indexContentArr.push(
		`export { ${hookName} } from "./hooks/${hookNameKebab}";`,
	);
}

// write index.ts
fs.writeFile(
	path.join(__dirname, "../src/index.ts"),
	indexContentArr.join("\n"),
);
