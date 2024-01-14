import styles from './Pagination.module.scss'
import ReactPaginate from 'react-paginate'

const Pagination = ({ totalPages, changePage }) => {
   return (
      <ReactPaginate
         className={styles.root}
         breakLabel="..."
         nextLabel=">"
         previousLabel="<"
         pageCount={totalPages}
         onPageChange={changePage}
      />
   )
}

export default Pagination
