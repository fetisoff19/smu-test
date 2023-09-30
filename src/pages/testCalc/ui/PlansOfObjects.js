import styles from '@pages/testCalc/index.styles.module.scss'
import { Button, InputAndSelect } from '@shared/ui/index.js'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCalcObjects } from '@pages/testCalc/model/testCalc.slice.js'

const Plan = ({ name, setPlans, min, max, length, object, initStart, initEnd, initValue }) => {
  const [start, setStart] = useState(initStart || '2023-09-01')
  const [end, setEnd] = useState(initEnd || '2023-09-10')
  const [value, setValue] = useState(initValue || 100)

  useEffect(() => {
    setPlans(prev => prev.map((_, index) => index + 1 === name ? { start, end, value, name, object } : _))
  }, [start, end, value])
  return (
    <div className={styles.settings}>
      <div className={styles.name}>
        <h4>{`План ${name}`}</h4>
        { name > 1 && length === name &&
          <Button text={'X'} className={styles.delete}
                  onClick={() => setPlans(prev => prev.filter((_, index) => index + 1 !== name))}/>}
      </div>
      <div>
        <InputAndSelect label={'Дата начала'} type={'date'} min={min} max={max} value={start} setValue={setStart}/>
        <InputAndSelect label={'Дата окончания'} type={'date'} min={min} max={max} value={end} setValue={setEnd}/>
        <InputAndSelect label={'Цель'} type={'number'} value={value} setValue={setValue}/>
      </div>
      <hr/>
    </div>
  )
}

const Object = ({ name, setObject, length }) => {
  const initialPlans = useSelector(state => state.testCalc.objects)
    ?.find(item => item.name === name)?.plans || [{}]
  const [plans, setPlans] = useState(initialPlans)
  const [start, setStart] = useState('2023-09-01')
  const [end, setEnd] = useState('2023-09-10')

  useEffect(() => {
    setObject(prev => prev.map((_, index) => index + 1 === name ? { plans, name } : _))
  }, [plans])
  return (
    <div className={styles.object}>
      <div className={styles.name}>
        <h3>{`Объект ${name}`}</h3>
        {name > 1 && length === name &&
          <Button className={styles.delete} text={'X'}
                  onClick={() => setObject(prev => prev.filter((_, index) => index + 1 !== name))}/>}
      </div>
      <div className={styles.settings}>
        {/* <InputAndSelect label={'Дата начала'} type={'date'} value={start} setValue={setStart}/> */}
        {/* <InputAndSelect label={'Дата окончания'} type={'date'} value={end} setValue={setEnd}/> */}
        <div>
          <strong>
            {`Сумма: ${plans?.reduce((acc, val) => acc + +val.value, 0)}`}
          </strong>
        </div>
        <hr/>
      </div>
      <div className={styles.settings}>
        {plans.map((plan, index) =>
          <Plan key={index} name={index + 1} object={name} initStart={plan?.start} initEnd={plan?.end} initValue={plan?.value}
                setPlans={setPlans} length={plans?.length}/>)}
      </div>
      <Button text={'Добавить план'} onClick={() => setPlans(prev => [...prev, {}])}/>
    </div>
  )
}

export const PlansOfObjects = () => {
  const initialObjects = useSelector(state => state.testCalc.objects) || [{}]

  const [objects, setObjects] = useState(initialObjects)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setCalcObjects([...objects]))
  }, [objects])

  return (
    <div className={styles.block}>
      <h3>Планы</h3>
      <div className={styles.objects}>
        {objects.map((plan, index) =>
          <Object key={index} name={index + 1} setObject={setObjects} length={objects?.length}/>)}
      </div>
      <Button text={'Добавить объект'} onClick={() => setObjects(prev => [...prev, {}])}/>
    </div>
  )
}
