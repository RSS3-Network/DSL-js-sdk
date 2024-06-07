import createClient from "openapi-fetch";

import type { paths } from "../types/openapi-schema.js";

export type Client = Readonly<{ baseUrl: string } & typeof client>;
const baseUrl = "https://gi.rss3.io";

export const client = Object.freeze(
  Object.assign({ baseUrl }, createClient<paths>({ baseUrl })),
);
