import React, { useRef, useState, useEffect } from 'react'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import styles from './index.styles.module.scss'

export function ReportTable ({ defaultData, defaultColumns, configRowSpan, setSizeColumns }) {
  const [data] = useState([...defaultData])
  const [columns] = useState([...defaultColumns])
  const [columnResizeMode] = useState('onChange')
  const [width, setWidth] = useState(0)

  const tableRef = useRef()
  const wrapRef1 = useRef(null)
  const wrapRef2 = useRef(null)
  useEffect(() => {
    const tableWidth = tableRef?.current?.getBoundingClientRect()?.width
    if (tableWidth) {
      setWidth(tableWidth)
    }
  })

  const handleScroll = e => {
    const targetDiv = e.target
    if (targetDiv === wrapRef1.current && wrapRef2.current) {
      wrapRef2.current.scrollLeft = targetDiv.scrollLeft
    } else if (targetDiv === wrapRef2.current && wrapRef1.current) {
      wrapRef1.current.scrollLeft = targetDiv.scrollLeft
    }
  }

  const table = useReactTable({
    data,
    columns,
    columnResizeMode,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true
  })

  function handleColumnResize () {
    table && setSizeColumns && setSizeColumns(table.getState().columnSizing)
  }
  if (data && columns) {
    return (
      <>
        <div ref={wrapRef1} className={styles.wrapper} onScroll={handleScroll}>
          <div style={{ width: `${width}px` }} className={styles.fakeTable}/>
        </div>
        <div ref={wrapRef2} className={styles.table} onScroll={handleScroll} onClick={handleColumnResize}>
          <table ref={tableRef}>
            <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <div // ресайзтинг
                          {...{
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            className: `${styles.resizer} ${
                              header.column.getIsResizing() ? styles.isResizing : ''
                            }`,
                            style: {
                              transform:
                                columnResizeMode === 'onEnd' &&
                                header.column.getIsResizing()
                                  ? `translateX(${
                                    table.getState().columnSizingInfo.deltaOffset
                                  }px)`
                                  : ''
                            }
                          }}
                        />
                      </div>
                    </th>
                  )
                })}
              </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map((row, index, array) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell, i, arr) => {
                  let rowSpan = null
                  let configIndex = null
                  const isRowSpan = cell.column.id && cell.row.original.set2bId && configRowSpan[cell.row.original.set2bId] && configRowSpan[cell.row.original.set2bId][cell.column.id]
                  const isIndex = cell.row.original.set2bId && configRowSpan[cell.row.original.set2bId] && isFinite(configRowSpan[cell.row.original.set2bId].index
                  )
                  if (isRowSpan) {
                    rowSpan = configRowSpan[cell.row.original.set2bId][cell.column.id]
                  }
                  if (isIndex) {
                    configIndex = configRowSpan[cell.row.original.set2bId].index
                  }
                  if (rowSpan === 0) {
                    return null
                  }
                  if (!rowSpan) {
                    return (
                        <td key={cell.id} style={{ minWidth: cell.column.getSize() }} className={styles.td}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    )
                  }
                  if ((rowSpan > 1) && (configIndex === index) && (configIndex - array.length + rowSpan <= 0)) {
                  // if (rowSpan > 1 && (!(index % rowSpan))) {
                  //   console.log(configIndex, index, config[cell.row.original.set2bId].index, rowSpan, array.length, cell.row.original.set2bId, cell.column.id,
                  //     configRowSpan[cell.row.original.set2bId].index - array.length + rowSpan > 0)
                    return (
                        <td key={cell.id} style={{ minWidth: cell.column.getSize() }} rowSpan={rowSpan}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    )
                  }
                  return null
                }
                )}
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </>
    )
  }
}
