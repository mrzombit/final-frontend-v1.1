
function InitialPeriodMonths(monthsName, startDate, projectionPeriod) {
  let date = new Date(startDate)
  let startMonthIndex = date.getMonth()
  let result = []
  for (let i = startMonthIndex; i < 12; i++) {
    result.push({ year: 1, month: monthsName[i] })
  }
  for (let i = 0; i < (12 * (projectionPeriod - 2)); i++) {
    result.push({ year: 2 + Math.floor(i / 12), month: monthsName[i] })
  }
  for (let i = 0; i < startMonthIndex; i++) {
    result.push({ year: projectionPeriod, month: monthsName[i] })
  }
  return result
}

export default InitialPeriodMonths
