import fs from "node:fs";

const response = await fetch("https://gi.rss3.io/docs/openapi.json");

fs.writeFileSync(
  new URL("./openapi.json", import.meta.url),
  JSON.stringify(await response.json(), null, 2),
);
