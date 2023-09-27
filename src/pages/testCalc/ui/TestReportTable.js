import React, { useEffect, useState } from 'react'
import { useLocalStorage } from '@shared/lib/hooks/index.js'
import { getConfigRowSpan, setPeriodInColumns } from '@entities/salaryReportTable/lib/utils.js'
import { ReportTable } from '@shared/ui/index.js'

export const TestReportTable = ({ defaultData, nameForLocalStorage }) => {
  const [data, setData] = useState(null)
  const [columns, setColumns] = useState(null)
  const [config, setConfig] = useState(null)
  const [sizeColumns, setSizeColumns] = useLocalStorage(`${nameForLocalStorage}SizeColumns`, '')

  const paramByColumnsTestReportTable = {
    plan: 'План',
    fact: 'Факт',
    revisedPlan: 'Скоррект. план',
    premium: 'Премия',
    deduction: 'Удержания',
    salaryFromDeduction: 'Выплата из удерж.',
    salaryTarget: 'Целевая ЗП',
    weight: 'Вес',
    workloadCoef: 'Коэф. загрузки',
    total: 'ИТОГО',
    salaryFixed: 'Фиксированная ЗП',
    salaryTotalCalc: 'Расчётная ЗП'
  }

  const ColumnsSalaryTestReportTable = [
    {
      id: 'subject',
      header: ' ',
      columns: [
        // {
        //   id: 'user',
        //   header: 'Сотрудник',
        //   accessorKey: 'user',
        //   size: 100
        // },
        {
          id: 'set2bId',
          header: 'Объект',
          accessorKey: 'set2bId',
          size: 100,
          cell: info => paramByColumnsTestReportTable[info.getValue()] || info.getValue()
        }
        // {
        //   id: 'areas',
        //   header: 'Участок',
        //   accessorKey: 'areas'
        // }
      ]
    },
    {
      id: 'para-total-incomingData',
      header: '',
      columns: [
        {
          id: 'parameters',
          accessorKey: 'parameters',
          header: 'Параметр',
          size: 150,
          cell: info => paramByColumnsTestReportTable[info.getValue()]
        }, {
          id: 'total',
          accessorKey: 'total',
          header: 'Всего',
          size: 100
        }, {
          id: 'incoming',
          accessorKey: 'incoming',
          header: 'Входящие данные',
          size: 100
        }
      ]
    },
    {
      id: 'period',
      header: 'Период',
      columns: [
        {
          id: 'totalByPeriod',
          accessorKey: 'totalByPeriod',
          header: 'Всего за период',
          size: 100
        }
      ]
    },
    {
      id: 'outgoingData',
      header: '',
      columns: [
        {
          id: 'outgoing',
          accessorKey: 'outgoing',
          header: 'Исходящие данные',
          size: 100
        }
      ]
    }
  ]

  useEffect(() => {
    const updateColumns = setPeriodInColumns(defaultData, [...ColumnsSalaryTestReportTable])
    const updatedData = defaultData.map(item => ({ ...item, user: 'subject' }))
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
  }, [defaultData])
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
