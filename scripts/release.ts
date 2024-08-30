#!/usr/bin/env zx

import { glob } from "node:fs/promises";
import { versionBump } from "bumpp";

try {
	const packages: string[] = [];

	for await (const file of glob([
		"package.json",
		"./packages/*/package.json",
	])) {
		packages.push(file);
	}

	console.log("Bumping versions in packages:", packages.join(", "), "\n");

	await versionBump({
		files: packages,
		commit: true,
		push: true,
		tag: true,
	});

	console.log(
		"Check https://github.com/RSS3-Network/RSS3-DSL-SDK/actions to see the release status.",
	);
} catch (err) {
	console.error(err);
}
