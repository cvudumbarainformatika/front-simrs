import { date } from 'quasar'

const dateDbFormat = (val) => {
  return date.formatDate(val, 'YYYY-MM-DD')
}
const dateBOD = (val) => {
  return date.formatDate(val, 'YYYYMMDD')
}
const dateLIS = (val) => {
  return date.formatDate(val, 'YYYYMMDDHHmmss')
}
const dateUnix = (val) => {
  return date.formatDate(val, 'X')
}
const humanDate = (val) => {
  return date.formatDate(val, 'DD MMMM YYYY')
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

const dateFullFormat = (val) => {
  return date.formatDate(val, 'DD MMMM YYYY')
}
const dateHalfFormat = (val) => {
  return date.formatDate(val, 'DD MM YYYY')
}

function titleCase(str) {
  const splitStr = str.toLowerCase().split(' ')
  for (let i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  // Directly return the joined string
  return splitStr.join(' ')
}
const olahUang = (val) => {
  // console.log('olah uang type', typeof val)
  if (typeof val === 'string') {
    let data = ''
    const array = val.split('.')
    for (let i = 0; i < array.length; i++) {
      data += array[i]
    }
    // console.log('olah uang return', parseFloat(data))
    return parseFloat(data)
  } else {
    return val
  }
}

export {
  dateHalfFormat,
  dateDbFormat,
  humanDate,
  diffDate,
  dateBOD,
  dateUnix,
  formatRp,
  olahUang,
  dateFullFormat,
  titleCase,
  dateLIS
}
