import React, { useEffect, useMemo, useState } from 'react'
import styles from './index.styles.module.scss'
import { PlansOfObjects } from '@pages/testCalc/ui/PlansOfObjects.js'
import { useSelector } from 'react-redux'
import { ActsOfObjects } from '@pages/testCalc/ui/ActsOfObjects.js'
import { PerformCalc } from '@pages/testCalc/ui/PerformCalc.js'
import { CalcSettings } from '@pages/testCalc/ui/CalcSettings.js'
import { TestReportTable } from '@pages/testCalc/ui/TestReportTable.js'
import { UniversalResizingTable } from '@entities/index.js'
import { ColumnsTestCalcSalaryTable } from '@pages/testCalc/lib/constants.js'
import { Pre } from '@pages/testCalc/ui/Pre.js'
import { SalaryCalcTransformForReport } from '@pages/testCalc/lib/salary-calc-transform-for-report.js'

const TestCalc = () => {
  const [allCalculations, setAllCalculations] = useState(null)
  const [futureDays, setFutureDays] = useState(null)
  const [thriftBox, setThriftBox] = useState(null)

  const showCalc = useSelector(state => state.testCalc.showCalc)
  const calculations = useSelector(state => state.testCalc.calculations)
  const viewStart = useSelector(state => state.testCalc.viewStart)
  const viewEnd = useSelector(state => state.testCalc.viewEnd)

  useEffect(() => {
    if (calculations) {
      setAllCalculations(calculations)
    } else setAllCalculations(null)
    return () => {}
  }
  , [calculations])

  useEffect(() => {
    if (showCalc) {
      const { futureDays, thriftBox } = calculations.find(item => item.created === showCalc)
      setFutureDays(futureDays)
      setThriftBox(thriftBox)
    } else {
      setFutureDays(null)
      setThriftBox(null)
    }
    return () => {}
  }
  , [showCalc])

  const calculationsTable = useMemo(() =>
    <UniversalResizingTable
      data={allCalculations}
      defaultColumns={ColumnsTestCalcSalaryTable}
      firstSorting={'created'}
      nameForLocalStorage={'testCalcTable'}
      title={'Все расчеты'}
    />, [allCalculations])
  const reportTable = useMemo(() => {
    if (futureDays && thriftBox && viewStart && viewEnd) {
      const res = SalaryCalcTransformForReport.transformDataByReport(futureDays, thriftBox, viewStart, viewEnd)
      return <TestReportTable defaultData={res} nameForLocalStorage={'testReport'}/>
    }
  }, [futureDays, thriftBox, viewStart, viewEnd])

  return (
    <div className={styles.page} >
      <div className={styles.blocks}>
        <PlansOfObjects/>
        <ActsOfObjects/>
        <CalcSettings/>
      </div>
      <PerformCalc/>
      <div className={styles.table}>
        {calculationsTable}
      </div>
      <div className={styles.table}>
        {reportTable}
      </div>
      <Pre futureDays={futureDays} thriftBox={thriftBox}/>
    </div>
  )
}

export default TestCalc
