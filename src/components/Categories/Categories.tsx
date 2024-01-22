import styles from './Categories.module.scss'

type CategoriesProps = {
   category: number
   selectCategory: (i: number) => void
   categoriesList: string[]
}

const Categories: React.FC<CategoriesProps> = ({
   category,
   selectCategory,
   categoriesList
}) => {
   return (
      <div className={styles.categories}>
         <ul>
            {categoriesList.map((cat, i) => (
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
