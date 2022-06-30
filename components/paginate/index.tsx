import ReactPaginate, { ReactPaginateProps } from 'react-paginate'

const Paginate: React.FC<ReactPaginateProps> = ({ ...props }) => {
  return (
    <ReactPaginate
      previousLabel="Previous"
      nextLabel="Next"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      hrefAllControls
      hrefBuilder={(pageIndex) => {
        return `?page=${pageIndex}`
      }}
      breakClassName="page-item"
      breakLinkClassName="page-link"
      marginPagesDisplayed={2}
      pageRangeDisplayed={1}
      containerClassName="pagination"
      activeClassName="active"
      {...props}
    />
  )
}

export default Paginate
