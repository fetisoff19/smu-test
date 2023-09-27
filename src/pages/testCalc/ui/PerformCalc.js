import React from 'react'
import { Button } from '@shared/ui/index.js'
import { useDispatch, useSelector } from 'react-redux'
import { ThriftBoxService } from '@pages/testCalc/lib/salary-calc-thirtbox.service.js'
import { SalaryCalcDaysService } from '@pages/testCalc/lib/salary-calc-days.service.js'
import { SalaryCalcMainService } from '@pages/testCalc/lib/salary-calc-main.service.js'
import { SalaryCalcValues } from '@pages/testCalc/lib/salary-calc-values.js'
import { addTestCalculation } from '@pages/testCalc/model/testCalc.slice.js'
import styles from '../index.styles.module.scss'

export const PerformCalc = () => {
  const dispatch = useDispatch()
  const storeObjects = useSelector(state => state.testCalc.objects)
  const storeActs = useSelector(state => state.testCalc.acts)
  const storeSettings = useSelector(state => state.testCalc.settings)
  const salaryConfig = useSelector(state => state.testCalc.subject).salaryConfig
  const start = useSelector(state => state.testCalc.start)
  const end = useSelector(state => state.testCalc.end)

  function handleClick () {
    let totalData = {}
    let pastData = {}
    storeObjects.forEach(item => {
      totalData = {
        ...totalData,
        [item.name]: {
          plan: item.plans?.reduce((acc, val) => acc + +val.value, 0) || 0,
          fact: storeActs?.find(obj => obj.name === item.name)?.acts?.reduce((acc, val) => acc + +val.value, 0) || 0,
          deduction: +storeSettings?.find(obj => obj.name === item.name)?.deduction || 0,
          premium: 0,
          salaryFromDeduction: 0,
          salaryTotalCalc: 0,
          salaryTarget: 0
        },
        total: {
          deduction: 0,
          premium: 0,
          salaryFromDeduction: 0,
          salaryTotalCalc: 0,
          salaryTarget: 0
        }
      }
      pastData = {
        ...pastData,
        [item.name]: {
          deduction: +storeSettings?.find(obj => obj.name === item.name)?.deduction || 0,
          balance: +storeSettings?.find(obj => obj.name === item.name)?.balance || 0
        }
      }
    })

    const thriftBox = ThriftBoxService.getThriftBox(storeObjects, storeActs, totalData, pastData)
    const daysArr = SalaryCalcDaysService.getCalcDaysArr(start, end, thriftBox.plans)
    const futureDays = SalaryCalcMainService.futureDaysIteration(daysArr, thriftBox, salaryConfig)
    // здесь и далее мутации daysArr и futureDays
    SalaryCalcValues.futureDaysWithWorkloadCoef(futureDays, salaryConfig?.areaHeadModelConfig, [])
    SalaryCalcMainService.calculationPlans(futureDays, thriftBox, false, salaryConfig?.areaHeadModelConfig)
    SalaryCalcMainService.calculationDays(futureDays, thriftBox)
    ThriftBoxService.getOutgoingData(thriftBox)
    dispatch(addTestCalculation({ created: new Date().toLocaleString(), start, end, thriftBox, futureDays }))
  }
  return (
    <Button className={styles.perform} text={'Выполнить расчет'} onClick={handleClick}/>
  )
}
