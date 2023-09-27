import React, { memo } from 'react'

import styles from './index.styles.module.scss'

export const Footer = memo(function Footer () {

  return (
    <footer className={styles.footer}>
      <div className={styles.notification}>
      </div>
    </footer>)
})
