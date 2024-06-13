#!/usr/bin/env zx

import { readFileSync } from "node:fs";
import { $ } from "zx";

const version = ((tag) => {
  if (!tag) {
    throw new Error("No tag specified");
  }

  return tag.startsWith("v") ? tag.slice(1) : tag;
})(process.argv[2]);

const pkg = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf-8"),
);

if (pkg.version !== version) {
  throw new Error(
    `Package version from tag "${version}" mismatches with the current version "${pkg.version}"`,
  );
}

const releaseTag = version.includes("beta")
  ? "beta"
  : version.includes("alpha")
    ? "alpha"
    : undefined;

console.log("Publishing version", version, "with tag", releaseTag || "latest");

if (releaseTag) {
  await $`pnpm -r publish --access public --no-git-checks --tag ${releaseTag}`;
} else {
  await $`pnpm -r publish --access public --no-git-checks`;
}
