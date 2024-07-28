// boostrap5 sytle pagination
import ReactPaginate from 'react-paginate'
import LeftArrow from '@/components/icons/left-arrow'
import RightArrow from '@/components/icons/right-arrow'

export default function BS5Pagination({ forcePage, onPageChange, pageCount }) {
  return (
    
    <ReactPaginate
      forcePage={forcePage}
      nextLabel={<RightArrow />}
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      previousLabel={<LeftArrow />}
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      renderOnZeroPageCount={null}
    />
  )
}
