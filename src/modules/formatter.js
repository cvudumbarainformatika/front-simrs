import { date } from 'quasar'

const dateDbFormat = (val) => {
  return date.formatDate(val, 'YYYY-MM-DD')
}
const dateBOD = (val) => {
  return date.formatDate(val, 'YYYYMMDD')
}
const dateUnix = (val) => {
  return date.formatDate(val, 'X')
}
const humanDate = (val) => {
  return date.formatDate(val, 'DD MMM YYYY')
}
const diffDate = (val) => {
  const date1 = new Date()
  const date2 = val
  const unit = 'years'

  const diff = date.getDateDiff(date1, date2, unit)
  return diff
}

const formatRp = (value) => {
  if (value !== null) {
    return Number(value)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1.')
  }
}

export { dateDbFormat, humanDate, diffDate, dateBOD, dateUnix, formatRp }
