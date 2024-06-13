#!/usr/bin/env zx

import { versionBump } from "bumpp";
import glob from "fast-glob";

try {
  const packages = await glob(["package.json", "./packages/*/package.json"]);

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
