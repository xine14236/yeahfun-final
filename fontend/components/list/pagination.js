import ReactPaginate from 'react-paginate'
import LeftArrow from '@/components/icons/left-arrow'
import RightArrow from '@/components/icons/right-arrow'
import styles from '@/styles/list.module.scss'

const Pagination = ({ pageCount, onPageChange, page }) => (
  <div aria-label="Page navigation example" className={styles.pageBtn}>
    <ReactPaginate
      previousLabel={<LeftArrow />}
      nextLabel={<RightArrow />}
      breakLabel={'...'}
      breakClassName={'breakItem item'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName={'pagination'}
      pageClassName={'pageItem item'}
      pageLinkClassName={'pageLink link'}
      previousClassName={'previousItem item'}
      previousLinkClassName={'previousLink link'}
      nextClassName={'nextItem item'}
      nextLinkClassName={'nextLink link'}
      breakLinkClassName={'breakLink link'}
      activeClassName={'active'}
      disabledClassName={'disabledItem'}
      disabledLinkClassName={'disabledLink link'}
      forcePage={page - 1} // 確保分頁按鈕顯示正確的頁碼
    />
  </div>
)

export default Pagination
