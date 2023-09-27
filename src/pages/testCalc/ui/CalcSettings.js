import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  setCalcEnd,
  setCalcSettings,
  setCalcStart,
  setCalcViewEnd,
  setCalcViewStart
} from '@pages/testCalc/model/testCalc.slice.js'
import styles from '@pages/testCalc/index.styles.module.scss'
import { Button, InputAndSelect } from '@shared/ui/index.js'

const Object = ({ name, setObjects, length }) => {
  const [deduction, setDeduction] = useState(0)
  // const [balance, setBalance] = useState(0)
  useEffect(() => {
    setObjects(prev => prev.map((_, index) => index + 1 === name ? { deduction, name } : _))
  }, [deduction])
  return (
    <div className={styles.object}>
      <div className={styles.name}>
        <h3>{`Объект ${name}`}</h3>
        {name > 1 && length === name &&
          <Button className={styles.delete} text={'X'}
                  onClick={() => setObjects(prev => prev.filter((_, index) => index + 1 !== name))}/>}
      </div>
      <div className={styles.settings}>
        <InputAndSelect label={'Невыпл. удержания'} type={'number'} value={deduction} setValue={setDeduction}/>
        {/* <InputAndSelect label={'Баланс вып. работ'} type={'number'} value={balance} setValue={setBalance}/> */}
      <div/>
      </div>
    </div>
  )
}

export const CalcSettings = () => {
  const [start, setStart] = useState('2023-09-01')
  const [end, setEnd] = useState('2023-09-10')
  const [viewStart, setViewStart] = useState('2023-09-01')
  const [viewEnd, setViewEnd] = useState('2023-09-10')
  const [objects, setObjects] = useState([{}])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setCalcSettings(objects))
  }, [objects])
  useEffect(() => {
    dispatch(setCalcStart(start))
  }, [start])
  useEffect(() => {
    dispatch(setCalcEnd(end))
  }, [end])
  useEffect(() => {
    dispatch(setCalcViewStart(viewStart))
  }, [viewStart])
  useEffect(() => {
    dispatch(setCalcViewEnd(viewEnd))
  }, [viewEnd])

  return (
    <div style={{ display: 'flex' }}>
      <div className={styles.block}>
        <h3>Настройка расч.</h3>
        <InputAndSelect label={'Дата начала'} type={'date'} value={start} setValue={setStart}/>
        <InputAndSelect label={'Дата окончания'} type={'date'} value={end} setValue={setEnd}/>
        <hr/>
        <h3>Настройка просм.</h3>
        <InputAndSelect label={'Дата начала'} type={'date'} value={viewStart} setValue={setViewStart}/>
        <InputAndSelect label={'Дата окончания'} type={'date'} value={viewEnd} setValue={setViewEnd}/>
      </div>
      <div className={styles.block}>
        <h3>Входящие данные</h3>
        <div className={styles.objects}>
          {objects?.map((plan, index) =>
            <Object key={index} name={index + 1} setObjects={setObjects} length={objects?.length}/>)}
        </div>
        <Button text={'Добавить объект'} onClick={() => setObjects(prev => [...prev, {}])}/>
      </div>
    </div>

  )
}
