import styles from './NotFound.module.scss'

const NotFound = () => {
   return (
      <div className="container">
         <h1 className={styles.notFoundTitle}>Page does not exist!😕</h1>
      </div>
   )
}

export default NotFound
