import React from 'react';
import ReactPaginate from "react-paginate";
import styles from './Pagination.module.css';
import {useDispatch} from "react-redux";
import {changePage} from "../../redux/slices/homeSlice";

const Pagination = () => {
    const dispatch = useDispatch();
    const handleChangePage = (e) => {
        dispatch(changePage(e.selected + 1))
    }
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={e => handleChangePage(e)}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
