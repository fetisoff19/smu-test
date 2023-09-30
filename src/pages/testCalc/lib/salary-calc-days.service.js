export class SalaryCalcDaysService {
  static getCalcDaysArr (start, end, plans) {
    const daysArr = []
    const curDate = new Date(start)
    const endDate = new Date(end)

    for (let i = curDate; i <= endDate.getTime(); SalaryCalcDaysService.incrementDatePeriod(i, 'D')) {
      let isPlanned = false
      for (const plansKey in plans) {
        plans[plansKey].forEach(plan => {
          if (SalaryCalcDaysService.isDayInObj(curDate, plan)) {
            isPlanned = true
          }
        })
      }
      if (!isPlanned) continue
      const dayObj = {
        date: new Date(curDate),
        salaryFixed: 0,
        salaryTarget: 0,
        salaryTotalCalc: 0,
        workloadCoef: undefined,
        objects: [],
        // accumulationCoef: 1,
        deduction: 0,
        premium: 0,
        salaryFromDeduction: 0,
        revisedPlan: 0,
        balance: 0
      }
      daysArr.push(dayObj)
    }
    return daysArr
  }

  static createDayObject () {
    return {
      name: '',
      plan: 0,
      fact: 0,
      salaryTarget: 0,
      salaryTotalCalc: 0,
      weight: 0,
      deduction: 0,
      premium: 0,
      salaryFromDeduction: 0,
      revisedPlan: 0,
      balance: 0,
      date: null
    }
  }

  static isDayInObj (date, obj) {
    return new Date(obj.start) <= date && new Date(obj.end) >= date
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

  static getDaysInMonth (date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
      .getDate()
  }
}
