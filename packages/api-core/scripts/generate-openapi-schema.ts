import fs from "node:fs";
import openapiTS, { astToString, type OpenAPI3 } from "openapi-typescript";

import openapi from "./openapi.json";

const ast = await openapiTS(openapi as unknown as OpenAPI3);

const contents = astToString(ast);

fs.writeFileSync(
  new URL("../src/types/openapi-schema.ts", import.meta.url),
  contents,
);
