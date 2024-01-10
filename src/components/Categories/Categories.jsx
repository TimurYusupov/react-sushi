import styles from './Categories.module.scss'

const Categories = ({ category, setCategory }) => {
   const categories = ['All', 'Single', 'Maki', 'Rolls', 'Sashimi', 'Plates']

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
