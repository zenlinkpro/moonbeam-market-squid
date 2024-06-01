export function getDayIdAndTimeStamp(timestamp: number) {
  const dayId = parseInt((timestamp / 86400000).toString(), 10)
  const dayStartTimestamp = dayId * 86400000
  return [dayId, dayStartTimestamp]
}

export function getHourIdAndStartUnix(timestamp: number) {
  const hourId = parseInt((timestamp / 3600000).toString(), 10)
  const hourStartUnix = hourId * 3600000
  return [hourId, hourStartUnix]
}
