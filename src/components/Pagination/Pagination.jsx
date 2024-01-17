import styles from './Pagination.module.scss'

const Pagination = ({ currentPage, selectCurrentPage, totalPages }) => {
   const pageNumbers = []
   for (let i = 0; i < totalPages; i++) {
      pageNumbers.push(i + 1)
   }

   return (
      <div className={styles.pageButtons}>
         <button
            onClick={() => selectCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
         >
            {'<'}
         </button>
         {pageNumbers.map((page, i) => (
            <button
               className={currentPage === i + 1 ? styles.active : ''}
               key={i}
               onClick={() => selectCurrentPage(i + 1)}
            >
               {page}
            </button>
         ))}
         <button
            onClick={() => selectCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
         >
            {'>'}
         </button>
      </div>
   )
}

export default Pagination
