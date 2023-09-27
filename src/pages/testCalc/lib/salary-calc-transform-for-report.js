const params = [
  'plan',
  'fact',
  'revisedPlan',
  'premium',
  'deduction',
  'salaryFromDeduction',
  'salaryTarget',
  'salaryTotalCalc',
  'weight'
]
const dayParams = [
  'salaryTarget',
  'salaryFixed',
  'salaryTotalCalc',
  'workloadCoef',
  'deduction',
  'premium',
  'salaryFromDeduction'
  // 'completionPercentage'
]

export class SalaryCalcTransformForReport {
  static transformDataByReport (days, thriftBox, viewStart, viewEnd) {
    const arrayObjects = []
    const objects = {}

    const viewDays = days.filter(day =>
      new Date(day.date) >= new Date(viewStart) &&
      new Date(day.date) <= new Date(viewEnd)
    )

    viewDays.forEach(day => day.objects.forEach(obj => arrayObjects.push(obj.name)))
    const set = new Set(arrayObjects)
    const objectNames = [...set, 'total']

    const { incoming, outgoing, total, totalByPeriod } =
      this.getDataByPeriod(days, viewStart, viewEnd, objectNames)
    console.log(
      incoming, outgoing, total, totalByPeriod
    )

    objectNames.forEach(item => {
      objects[item] = []
      if (item === 'total') {
        dayParams.forEach(param => objects[item].push({
          user: null,
          set2bId: 'total',
          name: 'total',
          parameters: param,
          total: null,
          incoming: null,
          outgoing: null,
          totalByPeriod: null,
          period: {}
          // rowSpan: index === 0 && i === 0 ? arr.length : null
        }))
      } else {
        params.forEach(param => objects[item].push({
          user: null,
          name: item,
          set2bId: item,
          parameters: param,
          total: null,
          incoming: null,
          outgoing: null,
          totalByPeriod: null,
          period: {}
        })
        )
      }
    })

    viewDays.forEach(day => {
      objects.total.forEach(elem => {
        if (elem.parameters === 'workloadCoef') {
          elem.period[day.date] = day[elem.parameters]
        } else elem.period[day.date] = Math.round(day[elem.parameters])
      })
      day.objects.forEach(item => {
        objects[item.name].forEach(elem => {
          if (elem.parameters === 'weight') {
            elem.period[item.date] = item[elem.parameters]
          } else elem.period[item.date] = Math.round(item[elem.parameters])
        })
      })
    })
    const result = []

    for (const key in objects) {
      objects[key].forEach((item, index) => {
        if (incoming[item.name]?.hasOwnProperty(item.parameters)) {
          item.incoming += Math.round(incoming[item.name][item.parameters])
        }

        if (outgoing[item.name]?.hasOwnProperty(item.parameters)) {
          item.outgoing += Math.round(outgoing[item.name][item.parameters])
        }

        if (totalByPeriod[item.name]?.hasOwnProperty(item.parameters)) {
          item.totalByPeriod += Math.round(totalByPeriod[item.name][item.parameters])
        }
        // if (thriftBox.total[item.name]?.hasOwnProperty(item.parameters)) {
        //   item.total += Math.round(thriftBox.total[item.name][item.parameters])
        // }
        if (total[item.name]?.hasOwnProperty(item.parameters)) {
          item.total += Math.round(thriftBox.total[item.name][item.parameters] || 0)
        }
        if (thriftBox.incoming[item.name]?.hasOwnProperty(item.parameters)) {
          item.incoming += Math.round(thriftBox.incoming[item.name][item.parameters])
        }
        if (thriftBox.outgoing[item.name]?.hasOwnProperty(item.parameters)) {
          item.outgoing += Math.round(thriftBox.outgoing[item.name][item.parameters])
        }
      })
      result.push(...objects[key])
    }
    console.log(total, thriftBox.total)
    return result
  }

  static getDataByPeriod (days, viewStart, viewEnd, objectNames, thriftBox) {
    const viewDays = days.filter(day =>
      new Date(day.date) >= new Date(viewStart) &&
      new Date(day.date) <= new Date(viewEnd)
    )
    const pastDays = days.filter(day => new Date(day.date) < new Date(viewStart))
    const futureDays = days.filter(day => new Date(day.date) > new Date(viewEnd))

    const totalByPeriod = {}
    const incoming = {}
    const outgoing = {}
    const total = {}

    objectNames.forEach(item => {
      incoming[item] = {}
      outgoing[item] = {}
      totalByPeriod[item] = {}
      total[item] = {}
      if (item === 'total') {
        dayParams.forEach(para => {
          incoming[item][para] = 0
          outgoing[item][para] = 0
          totalByPeriod[item][para] = 0
          total[item][para] = 0
        })
      } else {
        params.forEach(para => {
          incoming[item][para] = 0
          outgoing[item][para] = 0
          totalByPeriod[item][para] = 0
          total[item][para] = 0
        })
      }
    }
    )

    for (const totalByPeriodKey in totalByPeriod) {
      if (totalByPeriodKey === 'total') {
        for (const key in totalByPeriod[totalByPeriodKey]) {
          if (key !== 'workloadCoef') {
            viewDays.forEach(day => {
              totalByPeriod[totalByPeriodKey][key] += day[key] || 0
            })
          }
        }
      } else {
        for (const key in totalByPeriod[totalByPeriodKey]) {
          if (key !== 'weight') {
            viewDays.forEach(day => {
              const object = day.objects.find(obj => obj.name === totalByPeriodKey)
              if (object) {
                totalByPeriod[totalByPeriodKey][key] += object[key] || 0
              }
            })
          }
        }
      }
    }
    for (const incomingKey in incoming) {
      if (incomingKey === 'total') {
        for (const key in incoming[incomingKey]) {
          if (key !== 'workloadCoef') {
            pastDays.forEach(day => {
              incoming[incomingKey][key] += day[key] || 0
            })
          }
        }
      } else {
        for (const key in incoming[incomingKey]) {
          if (key !== 'weight') {
            pastDays?.forEach(day => {
              const object = day.objects.find(obj => obj.name === incomingKey)
              if (object) {
                incoming[incomingKey][key] += object[key] || 0
              }
            })
          }
        }
      }
    }
    for (const outgoingKey in outgoing) {
      if (outgoingKey === 'total') {
        for (const key in outgoing[outgoingKey]) {
          if (key !== 'workloadCoef') {
            futureDays.forEach(day => {
              outgoing[outgoingKey][key] += day[key] || 0
            })
          }
        }
      } else {
        for (const key in outgoing[outgoingKey]) {
          if (key !== 'weight') {
            futureDays?.forEach(day => {
              const object = day.objects.find(obj => obj.name === outgoingKey)
              if (object) {
                outgoing[outgoingKey][key] += object[key] || 0
              }
            })
          }
        }
      }
    }

    for (const totalKey in total) {
      if (totalKey === 'total') {
        for (const key in total[totalKey]) {
          if (key !== 'workloadCoef') {
            days.forEach(day => {
              total[totalKey][key] += day[key] || 0
            })
          }
        }
      } else {
        for (const key in total[totalKey]) {
          if (key !== 'weight') {
            days?.forEach(day => {
              const object = day.objects.find(obj => obj.name === totalKey)
              if (object) {
                total[totalKey][key] += object[key] || 0
              }
            })
          }
        }
      }
    }

    return { incoming, outgoing, total, totalByPeriod }
  }
}
