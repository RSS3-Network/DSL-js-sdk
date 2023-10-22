import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
dayjs.extend(relativeTime)

export function formatTime(ts: number): string {
  const _7daysAgo = dayjs().subtract(7, 'day')
  const time = dayjs(ts * 1000)
  return time.unix() > _7daysAgo.unix() ? formatFromNow(ts) : formatTime(ts)
}

export function formatFromNow(ts: number): string {
  const time = dayjs(ts * 1000)
  return time.fromNow()
}

export function formatFullTime(ts: number) {
  return dayjs(ts * 1000).format('MMM DD, YYYY HH:mm:ss')
}
