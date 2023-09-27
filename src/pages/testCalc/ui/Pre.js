import React from 'react'
import { useSelector } from 'react-redux'
import styles from '@pages/testCalc/index.styles.module.scss'

export const Pre = ({ futureDays, thriftBox }) => {
  const storeObjects = useSelector(state => state.testCalc.objects)
  const storeActs = useSelector(state => state.testCalc.acts)
  const storeSettings = useSelector(state => state.testCalc.settings)
  const storeSubject = useSelector(state => state.testCalc.subject)

  const thriftBoxArr = []
  for (const thriftBoxKey in thriftBox) {
    thriftBoxArr.push({ [thriftBoxKey]: thriftBox[thriftBoxKey] })
  }
  return (
    <>
      <div style={{ height: '50vh' }}></div>
      <h2>Для оперативного вывода переменных из расчета</h2>
      <div className={styles.blocks}>
        <pre>
          {JSON.stringify(
            {
              Объекты: storeObjects
            },
            null,
            2
          )}
        </pre>
        <pre>
          {JSON.stringify(
            {
              Акты: storeActs
            },
            null,
            2
          )}
        </pre>
        <pre>
          {JSON.stringify(
            {
              Настройки: storeSettings,
              Субъект: storeSubject
            },
            null,
            2
          )}
        </pre>
      </div>
      <div className={styles.blocks}>
        <div>
          Дни:
          {futureDays?.map((item, index) => <pre key={index}>  {JSON.stringify(
            item,
            null,
            2
          )}</pre>)}
        </div>
        <div>
           Кубышка:
          {thriftBoxArr?.map((item, index) => <pre key={index}>  {JSON.stringify(
            item,
            null,
            2
          )}</pre>)}
        </div>
      </div>
    </>

  )
}
