import type { Network, Tag } from "@rss3/api-core";

export function getIconURL(name: Tag | Network | string) {
	return `https://assets.rss3.io/web3-icons/${name}.png`;
}
