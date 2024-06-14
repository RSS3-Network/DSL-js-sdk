import {
  getAvailableWorkers,
  getCompatibleNetworks,
  getWorkerConfig,
} from "@rss3/api-core/networks";

export default async function Home() {
  const networks = await getCompatibleNetworks();
  const workers = await getAvailableWorkers({
    networkName: networks[0] ?? "",
  });
  const config = await getWorkerConfig({
    networkName: networks[0] ?? "",
    workerName: workers[0] ?? "",
  });

  console.log({ networks, workers, config });

  return <div>{"data"}</div>;
}
