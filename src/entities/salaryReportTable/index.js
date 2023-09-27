import React, { useEffect, useState } from 'react'
import { useLocalStorage } from '@shared/lib/hooks'
import { ReportTable } from '@shared/ui/index.js'
import { getConfigRowSpan, setPeriodInColumns } from './lib/utils.js'
import { ColumnsSalaryReportTable } from '@entities/salaryReportTable/lib/constants.js'

export const SalaryReportTable = ({ defaultData, nameForLocalStorage, subject }) => {
  const [data, setData] = useState(null)
  const [columns, setColumns] = useState(null)
  const [config, setConfig] = useState(null)
  const [sizeColumns, setSizeColumns] = useLocalStorage(`${nameForLocalStorage}SizeColumns`, '')

  useEffect(() => {
    const updateColumns = setPeriodInColumns(defaultData, ColumnsSalaryReportTable)
    const updatedData = defaultData.map(item => ({ ...item, user: subject }))
    const configRowSpan = getConfigRowSpan(updatedData, updateColumns)
    if (sizeColumns) {
      for (const column of updateColumns) {
        if (column?.columns.length) {
          column.columns.forEach(item => {
            if (item.id && sizeColumns[item.id]) {
              item.size = sizeColumns[item.id]
            }
          })
        }
      }
    }
    setConfig(configRowSpan)
    setColumns(updateColumns)
    setData(updatedData)
    return () => {}
  }, [])

  if (columns?.length && data?.length) {
    return (
      <ReportTable
        defaultData={data}
        defaultColumns={columns}
        configRowSpan={config}
        setSizeColumns={setSizeColumns}
      />
    )
  }
}
