import type { Token, TokenType } from "./token.js";

export type Theme<T> = {
	[key in TokenType]: (content: string, meta?: Token["meta"]) => T;
};

export const themePlain: Theme<string> = {
	html: (c) => JSON.stringify(ellipsis(stripHTMLTags(c))),
	name: (c) => JSON.stringify(c),
	platform: (c) => c,
	address: (c) => c,
	network: (c) => JSON.stringify(c),
	number: (c) => c,
	image: () => "",
	symbolImage: () => "",
	assetImage: () => "",
	symbol: (c) => c,
	text: (c) => c,
	time: (c) => `[${c}]`,
	separator: (c) => c,
	unknown: (c) => c,
};

function ellipsis(content: string, max = 50): string {
	let result = content;

	if (/\n/.test(content)) {
		result = result.replace(/\n[\s\S]+/g, " ").trim();
	}

	return result.length > max ? `${result.slice(0, max)}...` : result;
}

function stripHTMLTags(s: string) {
	return s.replace(/<[^>]*>?/gm, "");
}
