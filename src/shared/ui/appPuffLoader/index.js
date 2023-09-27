import React from 'react'
import { MoonLoader } from 'react-spinners'
import styles from '@styles/_export.module.scss'

export const AppPuffLoader = ({ size = 100 }) => {
  return (
    <div className={'center'}>
      <MoonLoader color={styles.appColor} size={size}/>
    </div>
  )
}
