import React from 'react'
import styles from './index.module.css';

const RegularButton = ({ title, onClick }) => {
  return (
    <button className={styles.btn} type="submit" onClick={onClick}>{title}</button>
  )
}

export default RegularButton;