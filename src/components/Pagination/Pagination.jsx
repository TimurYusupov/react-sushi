import styles from './Pagination.module.scss'

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
   const pageNumbers = []
   for (let i = 0; i < totalPages; i++) {
      pageNumbers.push(i + 1)
   }

   return (
      <div className={styles.pageButtons}>
         <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
         >
            {'<'}
         </button>
         {pageNumbers.map((page, i) => (
            <button
               className={currentPage === i + 1 ? styles.active : ''}
               key={i}
               onClick={() => setCurrentPage(i + 1)}
            >
               {page}
            </button>
         ))}
         <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
         >
            {'>'}
         </button>
      </div>
   )
}

export default Pagination
