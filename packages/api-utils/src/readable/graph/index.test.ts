import { it } from "vitest";
import { client } from "../../data/client.js";
import { formatGraph } from "./index.js";

it.concurrent("get from and to address", async ({ expect }) => {
  const res = await client().activity(
    "0x9eb5159f2ef2b9a80ed9bbb51e62aa0289812734d2f1292a140582ee7de0eb0f",
  );
  const dots = formatGraph(res.data);
  expect(dots.length).toBe(1);
  const item = dots[0];
  const content = item.object.content;
  expect(item.verb).toBe("transfer");
  expect(item.from).toBe("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
  expect(item.to).toBe("0x79370De41b274846521Bd95077a929D50cc72aEA");
  expect(content).toBe("500.00 ETH");
});

it.concurrent("get social post content", async ({ expect }) => {
  const res = await client().activity(
    "0x97d9e3f9df5f009ba530637a3194c72ae25cc5c1e81e7cd67fcb5921e379eec0",
  );
  const dots = formatGraph(res.data);
  expect(dots.length).toBe(1);
  const item = dots[0];
  const content = item.object.content;
  expect(item.from).toBe("0xC8b960D09C0078c18Dcbe7eB9AB9d816BcCa8944");
  expect(item.to).toBeUndefined();
  expect(content).toBe(
    "RSSHub Radar 自生自灭了几年居然自然增长到差不多 10 万周活用户了，而且没想到 Edge 用户那么多，都接近 Chrome 7 成了",
  );
});

it.concurrent("get social comment content", async ({ expect }) => {
  const res = await client().activity(
    "0x0a9e2df8c5a351ec6fdeb6b5b7bc062e7b20ad07b21c4754cea7a1c0fc377b58",
  );
  const dots = formatGraph(res.data);
  expect(dots.length).toBe(1);
  const item = dots[0];
  const content = item.object.content;
  expect(item.from).toBe("0x08d66b34054a174841e2361bd4746Ff9F4905cC2");
  expect(item.to).toBeUndefined();
  expect(content).toBe("原来如此，之前没听说过 `type`，今天学到了。非常感谢！");
});
