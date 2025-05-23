import React from 'react'
import styles from "./Input.module.css"

const Input = ({ children, placeholder, type, ...props}) => {
  return (
    <div className={styles.wrap}>
        <div className={styles.iconWrap}>{children}</div>
         <input className={styles.inputBox} type={type} placeholder={placeholder} {...props}/>
    </div>
  )
}

export default Input