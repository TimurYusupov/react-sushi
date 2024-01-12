import styles from './Categories.module.scss'

const Categories = ({ category, selectCategory }) => {
   const categories = ['All', 'Single', 'Maki', 'Rolls', 'Bento', 'Plates']

   return (
      <div className={styles.categories}>
         <ul>
            {categories.map((cat, i) => (
               <li
                  key={i}
                  className={`${styles.categoriesBtn} ${
                     category === i ? styles.active : ''
                  }`}
                  onClick={() => selectCategory(i)}
               >
                  {cat}
               </li>
            ))}
         </ul>
      </div>
   )
}

export default Categories
