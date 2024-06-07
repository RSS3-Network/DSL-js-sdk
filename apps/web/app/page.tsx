import {
  getAvailableWorkers,
  getCompatibleNetworks,
  getWorkerConfig,
} from "@rss3/api-core/networks";

export default async function Home() {
  const { data: networks = [] } = await getCompatibleNetworks();
  const { data: workers = [] } = await getAvailableWorkers({
    networkName: networks[0] ?? "",
  });
  const { data } = await getWorkerConfig({
    networkName: networks[0] ?? "",
    workerName: workers[0] ?? "",
  });

  console.log({ networks, workers, data });

  return <div>{"data"}</div>;
}
