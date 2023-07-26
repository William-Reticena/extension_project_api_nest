export const getWeekOffsetFromNow = (week = 1) => {
  const weekOffset = week * 7
  const now = new Date()

  const weekOffsetFromNow = new Date(now.setDate(now.getDate() + weekOffset))
  const date = weekOffsetFromNow.toLocaleString().split(' ')[0]

  return new Date(date)
}
