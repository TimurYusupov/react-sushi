import { useState } from 'react'
import styles from './Categories.module.scss'

const Categories = () => {
   const categories = ['All', 'Single', 'Maki', 'Rolls', 'Sashimi', 'Plates']
   const [category, setCategory] = useState(0)

   return (
      <div className={styles.categories}>
         <ul>
            {categories.map((cat, i) => (
               <li
                  key={i}
                  className={`${styles.categoriesBtn} ${
                     category === i ? styles.active : ''
                  }`}
                  onClick={() => setCategory(i)}
               >
                  {cat}
               </li>
            ))}
         </ul>
      </div>
   )
}

export default Categories
