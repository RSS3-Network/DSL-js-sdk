import type { CamelCasedPropertiesDeep } from "type-fest";

import type { paths } from "../schema.js";

export type HttpMethod =
	| "get"
	| "put"
	| "post"
	| "delete"
	| "options"
	| "head"
	| "patch"
	| "trace";

type MapNeverTo<T, R> = [T] extends [never] ? R : T;

type PathParameters<Method> = MapNeverTo<
	Method extends { parameters: { path: infer P } } ? P : never,
	object
>;

type QueryParameters<Method> = MapNeverTo<
	Method extends { parameters: { query?: infer Q } }
		? Q extends object
			? Q
			: never
		: never,
	object
>;

type RequestBodyParameters<Method> = MapNeverTo<
	Method extends {
		requestBody?: {
			content: {
				"application/json": infer B;
			};
		};
	}
		? B extends object
			? B
			: never
		: never,
	object
>;

export type PathParams<
	Path extends keyof paths,
	Method extends HttpMethod,
> = CamelCasedPropertiesDeep<
	PathParameters<paths[Path][Method]> &
		QueryParameters<paths[Path][Method]> &
		RequestBodyParameters<paths[Path][Method]>
>;
