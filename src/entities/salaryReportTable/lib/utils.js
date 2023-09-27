export function setPeriodInColumns (data, columns) {
  // const deepCloneColumns = JSON.parse(JSON.stringify(columns))
  if (columns[2].columns.length > 1) return columns
  const deepCloneColumns = columns
  const set = new Set()
  // let areasEqualSet2bId = true
  data.forEach(item => {
    // if (item.areas !== item.set2bId) {
    //   areasEqualSet2bId = false
    // }
    Object.keys(item.period).forEach(key => set.add(key))
  })
  const period = [...set]
  return deepCloneColumns.map(item => {
    if (item.id === 'period') {
      period.forEach(date => item.columns.push({
        id: date,
        accessorKey: 'period',
        header: date,
        size: 80,
        cell: info => info.getValue()[date] || ''
      }))
      item.columns.sort((a, b) => new Date(a.id) - new Date(b.id))
    }

    // if (item.id === 'user' && !areasEqualSet2bId) {
    //   item.columns.push({
    //     id: 'areas',
    //     header: 'Участки',
    //     accessorKey: 'areas'
    //   })
    // }
    return item
  })
}

export function getConfigRowSpan (data) {
  const result = {}
  data.forEach(item => {
    // if (item.areas !== item.set2bId) {
    //   result[item.set2bId] = {
    //     user: 0,
    //     set2bId: 0,
    //     areas: 5
    //   }
    // } else {
    result[item.set2bId] = {
      user: data.length,
      set2bId: 0
    }
    // }
  })

  // result[data[0].set2bId] = { ...result[data[0].set2bId], user: data.length }
  // console.log(result, data.length)
  data.forEach((item, index) => {
    result[item.set2bId] = { ...result[item.set2bId], set2bId: result[item.set2bId].set2bId + 1, index: index - result[item.set2bId].set2bId }
  })
  // console.log(result)
  return result
}
