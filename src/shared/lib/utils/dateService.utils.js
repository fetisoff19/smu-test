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

  static getDaysInMonth (date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
      .getDate()
  }

  static incrementDatePeriod (date, per) {
    switch (per) {
      case 'День':
      case 'D' :
        date.setDate(date.getDate() + 1)
        break
      case 'Неделя':
      case 'W' :
        date.setDate(date.getDate() + 7)
        break
      case 'Месяц':
        date.setMonth(date.getMonth() + 1)
        break
      case 'Квартал':
      case 'Q' :
        date.setMonth(date.getMonth() + 3)
        break
      case 'Полгода':
      case 'HY' :
        date.setMonth(date.getMonth() + 6)
        break
      case 'Год':
      case 'Y' :
        date.setMonth(date.getMonth() + 12)
    }
    return date
  }

  static getFinYearStart (date) {
    const finYearStart = new Date(date)
    finYearStart.setUTCHours(0, 0, 0, 0)
    finYearStart.setDate(1)
    finYearStart.setMonth(1)
    if (date.getMonth() === 0) {
      finYearStart.setFullYear(finYearStart.getFullYear() - 1)
      return finYearStart
    }
  }

  static formatDateForInput (dateObj) {
    return new Date(dateObj.getTime() - (dateObj.getTimezoneOffset() * 60000))
      .toISOString()
      .split('T')[0]
  }

  static formatDateTimeForInput (dateObj) {
    return new Date(dateObj.getTime() - (dateObj.getTimezoneOffset() * 60000))
      .toISOString()
      .split('Z')[0]
  }

  static getDateOfISOWeek (yearAndWeek) {
    // получает номер и год (2020-W06), возвращает дату начала недели
    const w = yearAndWeek.substring(6, 8)
    const y = yearAndWeek.substring(0, 4)
    const simple = new Date(y, 0, 1 + (w - 1) * 7)
    const dow = simple.getDay()
    const ISOweekStart = simple
    if (dow <= 4) { ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1) } else { ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay()) }
    return ISOweekStart
  }

  static getLastDayOfPeriod (firstDay, period) {
    const LD = incrementDatePeriod((new Date(firstDay), period))
    LD.setDate(LD.getDate() - 1)
    return LD
  }

  static getFirstDayOfPeriod (date, period) {
    let FD
    switch (period) {
      case 'День' :
      case 'D' :
        FD = new Date(date)
        break
      case 'Неделя' :
      case 'W' :
        const weekNum = this.getWeekNum(date)
        const dayNum = date.getDate()
        const weekBelongsToPreviousYear = (weekNum > 51 && dayNum < 7)
        const year = weekBelongsToPreviousYear ? date.getFullYear() - 1 : date.getFullYear()
        FD = this.getDateOfISOWeek(year + '-W' + weekNum)
        break
      case 'Месяц' :
      case 'M' :
        FD = new Date(date)
        FD.setDate(1)
        break
      case 'Квартал' :
      case 'Q' :
        const quarter = Math.floor((date.getMonth() / 3))
        FD = new Date(date.getFullYear(), quarter * 3, 1)
        break
      case 'Полгода' :
      case 'HY' :
        const fdMonth = date.getMonth() > 5 ? 6 : 0
        FD = new Date(date.getFullYear(), fdMonth, 1)
        break
      case 'Год' :
      case 'Y' :
        FD = new Date(date.getFullYear(), 0, 1)
    }
    return FD
  }

  static getWeekNum (date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    const dayNum = d.getUTCDay() || 7
    d.setUTCDate(d.getUTCDate() + 4 - dayNum)
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
  }
}
