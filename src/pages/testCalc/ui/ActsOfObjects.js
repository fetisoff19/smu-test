import styles from '@pages/testCalc/index.styles.module.scss'
import { Button, InputAndSelect } from '@shared/ui/index.js'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCalcActs } from '@pages/testCalc/model/testCalc.slice.js'

const Acts = ({ name, object, setActs, length }) => {
  const [start, setStart] = useState('2023-09-01')
  const [end, setEnd] = useState('2023-09-10')
  const [value, setValue] = useState(100)

  useEffect(() => {
    setActs(prev => prev.map((_, index) => index + 1 === name ? { start, end, value, name, object } : _))
  }, [start, end, value])
  return (
    <div className={styles.settings}>
      <div className={styles.name}>
        <h4>{`Акт ${name}`}</h4>
        {name > 1 && length === name &&
          <Button text={'X'} className={styles.delete}
                  onClick={() => setActs(prev => prev.filter((_, index) => index + 1 !== name))}/>}
      </div>
      <div>
        <InputAndSelect label={'Дата начала'} type={'date'} value={start} setValue={setStart}/>
        <InputAndSelect label={'Дата окончания'} type={'date'} value={end} setValue={setEnd}/>
        <InputAndSelect label={'Выполнено'} size={12} type={'number'} value={value} setValue={setValue}/>
      </div>
      <hr/>
    </div>
  )
}

const Object = ({ name, setObject, length }) => {
  const [acts, setActs] = useState([{}])

  useEffect(() => {
    setObject(prev => prev.map((_, index) => index + 1 === name ? { acts, name } : _))
  }, [acts])
  return (
    <div className={styles.object}>
      <div className={styles.name}>
        <h3>{`Объект ${name}`}</h3>
        {name > 1 && length === name &&
          <Button className={styles.delete} text={'X'}
                  onClick={() => setObject(prev => prev.filter((_, index) => index + 1 !== name))}/>}
      </div>
      <div className={styles.settings}>
        <div>
          <strong>
            {`Сумма: ${acts?.reduce((acc, val) => acc + +val.value, 0)}`}
          </strong>
        </div>
        <hr/>
        <div className={styles.settings}>
          {acts.map((plan, index) =>
            <Acts key={index} name={index + 1} object={name} setActs={setActs} length={acts?.length}/>)}
        </div>
      </div>
      <Button text={'Добавить акт'} onClick={() => setActs(prev => [...prev, {}])}/>
    </div>
  )
}

export const ActsOfObjects = () => {
  const [objects, setObjects] = useState([{}])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setCalcActs([...objects]))
  }, [objects])

  return (
    <div className={styles.block}>
      <h3>Акты</h3>
      <div className={styles.objects}>
        {objects.map((plan, index) =>
          <Object key={index} name={index + 1} setObject={setObjects} length={objects?.length}/>)}
      </div>
      <Button text={'Добавить объект'} onClick={() => setObjects(prev => [...prev, {}])}/>
    </div>
  )
}
