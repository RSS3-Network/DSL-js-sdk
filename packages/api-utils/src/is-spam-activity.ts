import type { Activity } from "@rss3/api-core";

export function isSpamActivity(activity: Activity) {
	return activity.totalActions !== activity.actions.length;
}
