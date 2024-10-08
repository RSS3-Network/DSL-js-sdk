import openAPI from "./openapi.json";
import { writeFileSync } from "./utils/write-file-sync";

const headers = `
/**
 * This file was auto-generated by scripts/create-component-alias.ts
 * Do not make direct changes to the file.
 */

import type { CamelCasedPropertiesDeep } from "type-fest";

import type { components } from "../schema.js";

`;

const customAliases = [
	`export type Media = CamelCasedPropertiesDeep<Required<components["schemas"]["SocialPost"]>['media'][number]>;`,
];

writeFileSync(
	import.meta,
	"../src/types/component-aliases.ts",
	headers +
		Object.keys(openAPI.components.schemas)
			.map(
				(key) =>
					`export type ${key} = CamelCasedPropertiesDeep<components["schemas"]["${key}"]>;`,
			)
			.concat(...customAliases)
			.sort()
			.join("\n\n"),
);
