import { getActivities } from "@rss3/api-core";

export default async function Home() {
  const activities = await getActivities({
    account: "0x127a9BA058C57E90509a28294685D7De659c2be9",
  });

  return (
    <div className="whitespace-pre-wrap font-mono">
      {JSON.stringify(activities, null, 2)}
    </div>
  );
}
