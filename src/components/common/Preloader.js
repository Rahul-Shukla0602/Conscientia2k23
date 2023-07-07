import React from 'react'
import styles from '../Styles/preloader.module.css'
import img from '../../assets/image/preanimation.gif'
const Preloader = () => {
  return (
    <div className={styles.body}>
      <div className={styles.center}>
        <div className={styles.ring}>
        </div>
        <img src={img} alt="" />
          {/* <span>loading...</span> */}
      </div>
    </div>
  )
}

export default Preloader
