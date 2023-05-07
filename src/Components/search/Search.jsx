import React from 'react';
import styles from "./Search.module.css";

const Search = ({search, setSearch}) => {

    return (
        <div className={styles.search}>
            <input value={search}
                   onChange={(e) => setSearch(e.target.value)}
                   className={styles.input}
                   placeholder={'Search'}/>
        </div>
    );
};

export default Search;