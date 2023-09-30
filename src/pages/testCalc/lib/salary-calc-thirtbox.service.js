import { DateServiceUtils as DateService } from '@shared/lib/utils/index.js'

export class ThriftBoxService {
  static getThriftBox (objects, acts, total, pastData) {
    const thriftBox = {
      plans: {},
      acts: {},
      planSum: {},
      balance: {},
      deduction: {},
      endDay: {},
      // result: {},
      incoming: {
        total: {
          deduction: 0,
          premium: 0,
          salaryFromDeduction: 0,
          salaryTotalCalc: 0,
          salaryTarget: 0
        }
      },
      total: {
        total: {
          deduction: 0,
          premium: 0,
          salaryFromDeduction: 0,
          salaryTotalCalc: 0,
          salaryTarget: 0
        }
      },
      outgoing: {
        total: {
          deduction: 0,
          premium: 0,
          salaryFromDeduction: 0,
          salaryTotalCalc: 0,
          salaryTarget: 0
        }
      }
    }
    objects?.forEach((obj, index) => {
      thriftBox.total[obj.name] = total[obj.name]
      thriftBox.outgoing[obj.name] = {
        deduction: 0,
        premium: 0,
        salaryFromDeduction: 0,
        salaryTotalCalc: 0,
        salaryTarget: 0
      }
      thriftBox.incoming[obj.name] = {
        deduction: 0,
        premium: 0,
        salaryFromDeduction: 0,
        salaryTotalCalc: 0,
        salaryTarget: 0
      }
      thriftBox.planSum = {
        ...thriftBox.planSum,
        [obj.name]: obj.plans.reduce((acc, val) => acc + +val.value, 0)
      }
      thriftBox.endDay = {
        ...thriftBox.endDay,
        [obj.name]: obj.plans.at(-1).end
      }
      thriftBox.plans = {
        ...thriftBox.plans,
        [obj.name]: []
      }

      obj.plans.forEach(item => {
        const start = new Date(item.start)
        const end = new Date(item.end)
        thriftBox.plans[obj.name].push({
          value: +item.value,
          start: item.start,
          end: item.end,
          balance: 0,
          deduction: 0,
          salaryFromDeduction: 0,
          diffDays: DateService.getDiffDays(start, end) + 1
        })
      })
    })

    acts?.forEach((act, index) => {
      thriftBox.acts = {
        ...thriftBox.acts,
        [act.name]: []
      }
      act.acts.forEach(item => {
        if (item.start && item.end) {
          const start = new Date(item.start)
          const end = new Date(item.end)
          thriftBox.acts[act.name].push({
            value: +item.value,
            start: item.start,
            end: item.end,
            // balance: 0,
            // deduction: 0,
            diffDays: DateService.getDiffDays(start, end) + 1
          })
        }
      })
    })

    for (const pastDataKey in pastData) {
      thriftBox.deduction = {
        ...thriftBox.deduction,
        [pastDataKey]: +pastData[pastDataKey]?.deduction || 0
      }
      thriftBox.balance = {
        ...thriftBox.balance,
        [pastDataKey]: +pastData[pastDataKey]?.balance || 0
      }
      thriftBox.incoming[pastDataKey].deduction = thriftBox.incoming[pastDataKey].deduction + +pastData[pastDataKey]?.deduction || 0
      thriftBox.incoming.total.deduction += thriftBox.incoming[pastDataKey].deduction
    }
    for (const obj in thriftBox.plans) {
      thriftBox.balance[obj] = thriftBox.balance[obj] || 0
      thriftBox.deduction[obj] = thriftBox.deduction[obj] || 0
      thriftBox.plans[obj] = thriftBox.plans[obj].sort((a, b) => new Date(a.start) - new Date(b.start))
    }
    return thriftBox
  }

  static getOutgoingData (thriftBox) {
    for (const thriftBoxKey in thriftBox.total) {
      if (thriftBox.balance[thriftBoxKey]) {
        thriftBox.outgoing[thriftBoxKey] = {
          ...thriftBox.outgoing[thriftBoxKey], plan: thriftBox.balance[thriftBoxKey]
        }
      }
      if (thriftBox.deduction[thriftBoxKey]) {
        thriftBox.outgoing[thriftBoxKey] = {
          ...thriftBox.outgoing[thriftBoxKey], deduction: thriftBox.deduction[thriftBoxKey]
        }
        thriftBox.outgoing.total.deduction = thriftBox.outgoing.total.deduction + thriftBox.deduction[thriftBoxKey]
        // thriftBox.total.total.deduction = thriftBox.total.total.deduction + thriftBox.deduction[thriftBoxKey]
      }
      // const totalDeduction = (thriftBox.deduction[thriftBoxKey] || 0) + (thriftBox.incoming[thriftBoxKey]?.deduction || 0) + (thriftBox.outgoing[thriftBoxKey]?.deduction || 0)
      for (const key in thriftBox.total.total) {
        if (thriftBoxKey !== 'total') {
          thriftBox.total.total[key] += thriftBox.total[thriftBoxKey][key] || 0
        }
      }
    }
    return thriftBox
  }
}
