import fs from "node:fs";
import path from "node:path";

export function writeFileSync(
	meta: { url: string },
	filePath: string,
	content: string,
) {
	const url = new URL(filePath, meta.url);
	const dir = path.dirname(url.pathname);

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}

	fs.writeFileSync(url, content);
}
