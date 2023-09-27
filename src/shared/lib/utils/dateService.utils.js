export class DateServiceUtils {
  static getDateForInputDate (date = new Date()) {
    // добавить проверку на тип входящих данных
    const formatDate = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    const month = date.getMonth() + 1
    const formatMonth = month < 10 ? `0${month}` : month
    return [date.getFullYear(), formatMonth, formatDate].join('-')
  }

  static getDiffDays (start, end) {
    const oneDay = 24 * 60 * 60 * 1000
    return Math.round(Math.abs((start - end) / oneDay))
  }
}
