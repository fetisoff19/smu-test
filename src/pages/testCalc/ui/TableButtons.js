import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@shared/ui/index.js'
import styles from '../index.styles.module.scss'
import { Delete, Hide, Show } from '@shared/svg/index.js'
import { deleteTestCalculation, setShowDaysByDateCreated } from '@pages/testCalc/model/testCalc.slice.js'

export const ShowTestCalculationsBtn = ({ created }) => {
  const [show, setShow] = useState(false)
  const showCalc = useSelector(state => state.testCalc.showCalc)
  const dispatch = useDispatch()

  function handleShowClick () {
    dispatch(setShowDaysByDateCreated(null))
    setShow(prev => !prev)
    setTimeout(() => {
      if (!show) {
        dispatch(setShowDaysByDateCreated(created))
      }
    }, 100)
  }

  useEffect(() => {
    if (show && showCalc?.length > 0 && showCalc !== created) {
      setShow(prev => !prev)
    }
    return () => {}
  }, [showCalc, show, created])

  return (
    <>
      {show
        ? <Button
          className={styles.svgButton + '' + show ? styles.isShowing : ''}
          text={<Show/>} title={'Скрыть расчёт'}
          onClick={handleShowClick}/>
        : <Button
          className={styles.svgButton}
          text={<Hide/>} title={'Показать расчёт'}
          onClick={handleShowClick}/>
      }
    </>
  )
}

export const DeleteTestCalculationsBtn = ({ created }) => {
  // const [_, setLocalStoreCalc] = useLocalStorage('testCalculations', [])
  const dispatch = useDispatch()
  function handleDeleteClick (created) {
    dispatch(deleteTestCalculation(created))
    // setLocalStoreCalc(prev => prev.filter((item) => created !== item.created))
  }
  return (
    <Button
      className={styles.svgButton}
      text={<Delete/>} title={'Удалить'}
      onClick={() =>
        handleDeleteClick(created)}/>)
}
