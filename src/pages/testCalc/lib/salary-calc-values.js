import { SalaryCalcDaysService } from '@pages/testCalc/lib/salary-calc-days.service.js'

export class SalaryCalcValues {
  static getValuePerDay (date, acts) {
    let sum = 0
    if (!acts?.length) return sum
    for (const act of acts) {
      if (SalaryCalcDaysService.isDayInObj(date, act) && act.diffDays) {
        sum += (+act.value / act.diffDays)
      }
    }
    return sum
  }

  static futureDaysWithWorkloadCoef (futureDays, areaHeadModelConfig, workloadCoefObjects = []) {
    if (areaHeadModelConfig?.workloadCoefActive) {
      futureDays.forEach(day => {
        const workloadCoef = this
          .calcWorkloadCoef(areaHeadModelConfig, day.objects, workloadCoefObjects)
        if (workloadCoef) {
          day.workloadCoef = workloadCoef
          day.salaryTarget *= workloadCoef
        } else day.workloadCoef = 1
      })
    }
    return futureDays
  }

  static calcWorkloadCoef (calcConfig, objects, workloadCoefObjects) {
    const planned = objects
      .filter(item => item?.plan > 0) // .filter(ia => ia?.planType === 'base' && ia?.plannedFot > 0)
    // console.log(planned)
    // const objCount = this.getObjectCount(planned, workloadCoefObjects)
    const objCount = planned.length
    if (objCount === 2) {
      return calcConfig.workloadCoefMultiplier2
    }
    if (objCount === 3) {
      return calcConfig.workloadCoefMultiplier3
    }
    if (objCount === 4) {
      return calcConfig.workloadCoefMultiplier4
    }
    if (objCount >= 5) {
      return calcConfig.workloadCoefMultiplier5
    }
  }

  static getObjectCount (objects, workloadCoefObjects) {
    const popLvl = num => {
      const split = num.split('-')
      if (split.length === 1) return num
      split.pop()
      return split.join('-')
    }
    let objIds = []
    let defaultObjectOds = []
    for (const intAgr of objects) {
      let objFound = false
      let lvl = 5
      let num = intAgr.num
      while (lvl >= 1) {
        for (const obj of workloadCoefObjects) {
          for (const numObj of obj.numbers) {
            if (numObj === num) {
              objIds.push(numObj._id)
              objFound = true
              break
            }
          }
        }
        lvl--
        num = popLvl(num)
      }
      if (!objFound) {
        defaultObjectOds
          .push(intAgr.num.split('-')[0] + '-' + intAgr.num.split('-')[1])
      }
    }
    objIds = [...new Set(objIds)]
    defaultObjectOds = [...new Set(defaultObjectOds)]
    return objIds.length + defaultObjectOds.length
  }
}
