import React, { useMemo, useState } from 'react'
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import styles from './index.styles.module.scss'

import { AnimatePresence, motion } from 'framer-motion'
import { InputAndSelect } from '@shared/ui'

export function ResizingTable ({ animation, name, header = false, defaultData, defaultColumns, firstSorting, columnVisible, setVisibleColumns, setSizeColumns }) {
  // const [data, setData] = useState([...defaultData])
  const [columns, setColumns] = useState([...defaultColumns])
  const [columnResizeMode, setColumnResizeMode] = useState('onChange')
  const [columnVisibility, setColumnVisibility] = useState(columnVisible)
  const [sorting, setSorting] = useState([firstSorting])
  const [isShowFilter, setIsShowFilter] = useState(false)
  // const rerender = useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data: defaultData,
    // defaultData,
    columns,
    columnResizeMode,
    state: {
      columnVisibility,
      sorting
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel()
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: true
  })

  function handleColumnClick (column) {
    const id = column?.columnDef?.id
    if (id && setVisibleColumns) {
      setVisibleColumns(prev => ({ ...prev, [id]: !column.getIsVisible() }))
    }
  }

  function handleColumnResize () {
    table && setSizeColumns && setSizeColumns(table.getState().columnSizing)
  }

  const transition = useMemo(() => animation &&
    ({
      duration: 0.4,
      type: 'tween',
      ease: 'anticipate'
    }),
  [])

  const animate = useMemo(() => animation &&
    ({
      x: 0,
      y: 0,
      opacity: 1
    }),
  [])

  const initial = useMemo(() => animation &&
    ({
      y: -20,
      opacity: 0
    }),
  [])

  return (
    <div className={styles.table} onClick={handleColumnResize}>

      <div className={styles.header}>
        {header && <h3>{name}</h3>}
        <InputAndSelect label={'Показать/скрыть фильтры'} type={'checkbox'} checked={isShowFilter} setValue={setIsShowFilter}/>
      </div>
      <AnimatePresence>
      {isShowFilter &&
        <motion.div className={styles.filter} animate={animate} initial={initial} exit={initial} transition={transition}>
          {table.getAllLeafColumns().map(column => { // чекбоксы с видимостью столбцов
            return (
              <motion.div key={column.id} animate={animate} initial={initial} exit={initial} transition={transition}>
                <label>
                  <input type={'checkbox'} checked={column.getIsVisible()}
                         onClick={() => handleColumnClick(column)}
                         onChange={column.getToggleVisibilityHandler()}/>
                  {' '}
                  {column.columnDef.header.length ? column.columnDef.header : column.columnDef.id}
                </label>
              </motion.div>
            )
          })}
        </motion.div>}
        </AnimatePresence>
      <table>
        <thead>
        <AnimatePresence>
        {table.getHeaderGroups().map(headerGroup => {
          return (
            <motion.tr key={headerGroup.id} animate={animate} initial={initial} exit={initial} transition={transition}>
              {headerGroup.headers.map(header =>
                (
                  <motion.th key={header.id} colSpan={header.colSpan} // сортировка
                             animate={animate} initial={initial} exit={initial} transition={transition}
                      onClick={() => header.column.getToggleSortingHandler()}
                      style={{
                        width: header.getSize() || 'auto'
                      }}
                  >
                    {header.isPlaceholder
                      ? null
                      : (
                        <motion.div
                          {...{
                            className: header.column.getCanSort()
                              ? styles.sortColumn
                              : '',
                            onClick: header.column.getToggleSortingHandler()
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: '\u25B4',
                            desc: '\u25BE'
                          }[header.column.getIsSorted()] ?? null}
                        </motion.div>
                        )}
                    <motion.div
                      {...{
                        onMouseDown: header.getResizeHandler(), // ресайзтинг
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
                  </motion.th>
                )
              )}
          </motion.tr>
          )
        })}
          </AnimatePresence>
        </thead>
        <tbody>
          <AnimatePresence>
            {table.getRowModel().rows.map(row => (
              <motion.tr
                animate={animate} initial={initial} exit={initial} transition={transition}
                key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <motion.td
                    animate={animate} initial={initial} exit={initial} transition={transition}
                    key={cell.id} style={{ width: cell.column.getSize() }} >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </motion.td>
                ))}
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>

      </table>
      {/* <pre> */}
        {/* {JSON.stringify( */}
        {/*   { */}
        {/*     columnSizing: table.getState().columnSizing, */}
        {/*     columnSizingInfo: table.getState().columnSizingInfo, */}
        {/*     columnVisibility: table.getState().columnVisibility, */}
        {/*     sorting */}
        {/*   }, */}
        {/*   null, */}
        {/*   2 */}
        {/* )} */}
      {/* </pre> */}
    </div>
  )
}
