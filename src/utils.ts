export function fetchWithLog(
  logger = (input: RequestInfo | URL) => {
    console.log('fetch:', input)
  },
): typeof fetch {
  return (input, init) => {
    logger(input)
    return fetch(input, init)
  }
}
