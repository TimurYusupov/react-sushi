import styles from './Pagination.module.scss'

import { setCurrentPage } from '../../redux/slice/homeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

type TPaginationProps = {
   totalPages: number
}

const Pagination: React.FC<TPaginationProps> = ({ totalPages }) => {
   const dispatch = useDispatch()
   const { currentPage } = useSelector((state: RootState) => state.homeSlice)

   const pageNumbers: number[] = []

   for (let i = 0; i < totalPages; i++) {
      pageNumbers.push(i + 1)
   }

   return (
      <div className={styles.pageButtons}>
         <button
            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            disabled={currentPage === 1}
         >
            {'<'}
         </button>
         {pageNumbers.map((page, i) => (
            <button
               className={currentPage === i + 1 ? styles.active : ''}
               key={i}
               onClick={() => dispatch(setCurrentPage(i + 1))}
            >
               {page}
            </button>
         ))}
         <button
            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            disabled={currentPage === totalPages}
         >
            {'>'}
         </button>
      </div>
   )
}

export default Pagination
