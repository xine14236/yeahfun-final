import styles from '@/styles/list.module.scss'

export default function ListPageBtn() {
  return (
    <>
      <div aria-label="Page navigation example" className={styles.pageBtn}>
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#/" aria-label="Previous">
              <span aria-hidden="true">«</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#/">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#/">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#/">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#/" aria-label="Next">
              <span aria-hidden="true">»</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
