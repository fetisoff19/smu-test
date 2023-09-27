import { sortingTable } from '@shared/lib/utils/index.js'
import React from 'react'
import { DeleteTestCalculationsBtn, ShowTestCalculationsBtn } from '@pages/testCalc/ui/TableButtons.js'

export const ColumnsTestCalcSalaryTable = [
  // {
  //   id: 'userId',
  //   header: 'Пользователь',
  //   accessorKey: 'userId',
  //   sortingFn: sortingTable
  // },
  {
    id: 'start',
    accessorKey: 'start',
    header: 'Дата начала',
    sortingFn: sortingTable
  },
  {
    id: 'end',
    header: 'Дата окончания',
    accessorKey: 'end',
    sortingFn: sortingTable
  },
  {
    id: 'created',
    header: 'Дата создания расчёта',
    accessorKey: 'created',
    // cell: info => info.getValue(),
    // size: 200
    sortingFn: sortingTable
  },
  // {
  //   id: 'mode',
  //   header: 'Способ расчета',
  //   accessorKey: 'mode',
  //   sortingFn: sortingTable
  // },
  // {
  //   id: 'salaryFixed',
  //   header: 'Оклад',
  //   accessorKey: 'salaryFixed',
  //   sortingFn: sortingTable,
  //   cell: toFixed2Cell
  // },
  // {
  //   id: 'salaryTotalCalc',
  //   header: 'Целевой доход',
  //   accessorKey: 'salaryTotalCalc',
  //   sortingFn: sortingTable,
  //   cell: toFixed2Cell
  // },
  // {
  //   id: 'isModelling',
  //   header: 'Моделирование',
  //   accessorKey: 'isModelling',
  //   cell: info => info.getValue()
  //     ? <div>
  //       <Ok/>
  //     </div>
  //     : '',
  //   sortingFn: sortingTable
  //   // cell: toFixed2Cell
  // },
  {
    header: '',
    id: 'Показать расчёт',
    accessorKey: 'created',
    enableSorting: false,
    cell: info => <ShowTestCalculationsBtn created={info.getValue()}/>,
    size: 30
  },
  {
    header: '',
    id: 'Удалить расчёт',
    accessorKey: 'created',
    enableSorting: false,
    cell: info => <DeleteTestCalculationsBtn created={info.getValue()}/>,
    size: 30
  }
]
