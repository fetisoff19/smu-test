import React, { useEffect, useState } from 'react'

import { useLocalStorage } from '@shared/lib/hooks'
import { ResizingTable } from '@shared/ui/index.js'

export const UniversalResizingTable = ({ data, defaultColumns, firstSorting, nameForLocalStorage, title, id, animation = true }) => {
  const [columns, setColumns] = useState(null)
  const [invisibleColumns, setInvisibleColumns] = useLocalStorage(`${nameForLocalStorage}InvisibleColumns`, '')
  const [sizeColumns, setSizeColumns] = useLocalStorage(`${nameForLocalStorage}SizeColumns`, '')

  useEffect(() => {
    if (sizeColumns) {
      for (const column of defaultColumns) {
        if (column.id && sizeColumns[column.id]) {
          column.size = sizeColumns[column.id]
        }
      }
    }
    setColumns(defaultColumns)

    return () => {}
  }, [])

  if (columns?.length && data?.length) {
    return (
      <ResizingTable
        id={id}
        animation={animation}
        name={title}
        header={!!title}
        defaultData={data}
        defaultColumns={columns}
        firstSorting={{ id: firstSorting || defaultColumns[0]?.id }}
        columnVisible={invisibleColumns}
        setVisibleColumns={setInvisibleColumns}
        setSizeColumns={setSizeColumns}
      />
    )
  }
}
