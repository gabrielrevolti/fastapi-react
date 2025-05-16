import React from 'react'
import styles from  "./Header.module.css"
import logo from "../../assets/mactek.jpeg"

const Header = () => {
  return (
    <div className={styles.headerSize}>
        <div className={styles.logoImage}>
            <img className={styles.logoImage} src={logo} alt="logo da empresa" />
        </div>
    </div>
  )
}

export default Header