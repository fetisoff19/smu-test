export const paramByColumnsReportTable = {
  actualPlan: 'План',
  fotAct: 'Факт',
  premium: 'Премия',
  deduction: 'Удержания',
  salaryFromDeduction: 'Выплата из удерж.',
  salaryDynTarget: 'Дин. часть ЗП',
  weight: 'Вес',
  revisedPlan: 'Скоррект. план',
  salaryFixed: 'Фикс. часть ЗП',
  salaryDynCalc: 'Доход расчетный дин.',
  workloadCoef: 'Коэф. загрузки',
  salaryPremium: 'Премия',
  total: 'ИТОГО'
}

export const ColumnsSalaryReportTable = [
  {
    id: 'subject',
    header: 'Субъект ',
    columns: [
      {
        id: 'user',
        header: 'Сотрудник',
        accessorKey: 'user',
        size: 100
      },
      {
        id: 'set2bId',
        header: 'ВД',
        accessorKey: 'set2bId',
        size: 100,
        cell: info => paramByColumnsReportTable[info.getValue()] || info.getValue()
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
        cell: info => paramByColumnsReportTable[info.getValue()]
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
