import _createClient, { type ClientOptions } from "openapi-fetch";

import type { paths } from "./schema.js";

export type Client = Readonly<
	{ baseUrl: string } & ReturnType<typeof createClient>
>;

let client: Client | null = null;

export function getDefaultClient(): Client {
	if (!client) {
		client = createClient();
	}

	return client;
}

export function setDefaultClient(newClient: Client) {
	client = newClient;
}

export function createClient({
	baseUrl = "https://gi.rss3.io",
	...options
}: ClientOptions = {}) {
	return Object.freeze(
		Object.assign({ baseUrl }, _createClient<paths>({ baseUrl, ...options })),
	);
}
