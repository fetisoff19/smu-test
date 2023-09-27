import { SalaryCalcDaysService } from '@pages/testCalc/lib/salary-calc-days.service.js'
import { roundTo2 } from '@shared/lib/utils/value.utils.js'
import { SalaryCalcValues } from '@pages/testCalc/lib/salary-calc-values.js'
import { DateServiceUtils, DateServiceUtils as DateService } from '@shared/lib/utils/index.js'

export class SalaryCalcMainService {
  static futureDaysIteration (futureDays, {
    plans,
    acts
  }, {
    salaryFixed,
    salaryTarget
  }) {
    for (const day of futureDays) {
      day.salaryFixed = salaryFixed
        ? roundTo2(salaryFixed / SalaryCalcDaysService.getDaysInMonth(new Date(day.date)))
        : 0
      day.salaryTarget = roundTo2(salaryTarget / SalaryCalcDaysService.getDaysInMonth(new Date(day.date)))
      for (const plansKey in plans) {
        const factValuePerDay = SalaryCalcValues.getValuePerDay(day.date, acts[plansKey])
        const plannedValuePerDay = SalaryCalcValues.getValuePerDay(day.date, plans[plansKey])
        let dayObject = day.objects.find(item => item.name === plansKey)
        if (!dayObject) {
          dayObject = SalaryCalcDaysService.createDayObject()
          day.objects.push(dayObject)
        }
        dayObject.name = plansKey
        dayObject.fact += factValuePerDay
        dayObject.plan += plannedValuePerDay
        dayObject.date = day.date
      }
    }
    // console.log(futureDays)
    return futureDays
  }

  static calculationPlans (futureDays, thriftBox, isModelling, salaryConfig) {
    const { plans } = thriftBox
    for (const plansKey in plans) {
      const objectPlans = plans[plansKey]
      objectPlans?.forEach(plan => {
        const fiveHoursInMs = 18000000 // величину можно скорректировать или вынести проверку в отдельную функцию
        const diffDaysStartEndObject = (DateService.getDiffDays(plan.start, thriftBox.endDay[plansKey]) + 1)
        const balancePerDay = (thriftBox.balance[plansKey] / diffDaysStartEndObject)
        const deductionPerDay = thriftBox.deduction[plansKey] / diffDaysStartEndObject
        // console.log(deductionPerDay, thriftBox.deduction[plansKey], diffDaysStartEndObject, plan.start, thriftBox.endDay[plansKey])
        for (const day of futureDays) {
          if (day.date >= plan.start && day.date <= plan.end) {
            for (const object of day.objects) {
              if (plansKey === object.name && object.plan > 0) {
                if (isModelling) {
                  object.revisedPlan = object.fact
                } else object.revisedPlan = (object.plan + balancePerDay)
                const isPremium = object.fact && object.plan && (object.fact - object.revisedPlan > 0)
                const isDeduction = object.plan && (object.plan - object.fact > 0)
                const isSalaryFromDeduction =
                  (((object.fact - object.plan) >= 0) || (object.fact - object.revisedPlan) >= 0) &&
                  (thriftBox.deduction[plansKey] > 0)
                object.salaryTarget = day.salaryTarget + object.salaryFromDeduction
                object.balance = object.revisedPlan - object.fact
                plan.balance += (object.balance - balancePerDay)

                if (isPremium) {
                  object.premium = Math.min(
                    ((object.fact - object.revisedPlan) * object.salaryTarget / object.revisedPlan) *
                    (salaryConfig?.premiumCoef || 1),
                    object.salaryTarget
                  ) * (salaryConfig?.salaryPremiumPercent || 100) / 100
                }

                if (isDeduction) {
                  const deduction = Math.min(
                    (object.balance * object.salaryTarget / object.revisedPlan),
                    object.salaryTarget
                  ) * (salaryConfig?.deductionCoef || 1)
                  object.deduction += deduction
                  plan.deduction += deduction
                }

                if (isSalaryFromDeduction) {
                  object.salaryFromDeduction += deductionPerDay
                  plan.salaryFromDeduction += deductionPerDay
                }
                day.revisedPlan += object.revisedPlan
              }
            }
            // крайний день плана, корректируем кубышку
            if ((Math.abs(plan.end.getTime() - day.date.getTime()) < fiveHoursInMs) || futureDays.at(-1).date === day.date) {
              thriftBox.balance[plansKey] += plan.balance
              thriftBox.deduction[plansKey] += (plan.deduction - plan.salaryFromDeduction)
            }
          }
        }
      })
    }
    return [futureDays, thriftBox]
  }

  static calculationDays (futureDays, thriftBox) {
    for (const day of futureDays) {
      for (const object of day.objects) {
        object.weight = object.revisedPlan / day.revisedPlan
        object.premium = roundTo2(object.weight * object.premium)
        object.deduction = roundTo2(object.weight * object.deduction)
        object.salaryFromDeduction = roundTo2(object.weight * object.salaryFromDeduction)
        object.salaryTarget = roundTo2(object.weight * day.salaryTarget)
        object.salaryTotalCalc = roundTo2(
          (object.salaryTarget + object.salaryFromDeduction + object.premium - object.deduction)
        )
        day.premium += object.premium
        day.deduction += object.deduction
        day.salaryFromDeduction += object.salaryFromDeduction
        day.salaryTotalCalc += object.salaryTotalCalc
        object.weight = roundTo2(object.weight)
        object.plan = roundTo2(object.plan)
        object.revisedPlan = roundTo2(object.revisedPlan)
        object.fact = roundTo2(object.fact)
        object.date = DateServiceUtils.getDateForInputDate(object.date)

        thriftBox.total[object.name].premium += object.premium
        thriftBox.total[object.name].deduction += object.deduction
        thriftBox.total[object.name].salaryFromDeduction += object.salaryFromDeduction
        thriftBox.total[object.name].salaryTotalCalc += object.salaryTotalCalc
        thriftBox.total[object.name].salaryTarget += object.salaryTarget
      }
      day.revisedPlan = roundTo2(day.revisedPlan)
      day.date = DateServiceUtils.getDateForInputDate(day.date)
    }
    return [futureDays, thriftBox]
  }
}
