import React from "react";
import ReactPaginate from "react-paginate";
import styles from './pagination.module.css';


const Pagination = ({handlePageClick, itemNotFound, pageCount}) => {

    return (
        <ReactPaginate breakLabel="..."
                            nextLabel="next >"
                            className={styles.paginationContainer}
                            pageClassName={styles.paginationItem}
                            previousClassName={styles.previousItem}
                            nextClassName={styles.nextItem}
                            activeClassName={styles.paginationActive}
                            disabledClassName={styles.paginationDisabled}
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={4}
                            pageCount={itemNotFound ? 0 : pageCount}
                            previousLabel="< previous"
                            renderOnZeroPageCount={null}/>
    )
}

export default Pagination;
