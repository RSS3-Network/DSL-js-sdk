import { it } from "vitest";
import { client } from "../../data/client.js";
import { formatContent } from "./index.js";

it.concurrent("get social post content", async ({ expect }) => {
  const res = await client().activity(
    "0xafd4f260528c8274345a6447028d84bc2303eddb0e8bca1f2006a106632cda9a",
  );
  const content = formatContent(res.data);
  expect(content?.body).toBe(
    "Halfway through week 5 of @verticalcrypto.lens and @pronounceddrop.lens ‘s Digital Fashion Residency, which seems like the perfect time to drop some merch…\n\nIntroducing the DFR handbag 🦠🩸\n\n- Free\n- Unlimited time to collect \n- Collect on https://hey.xyz",
  );
});
