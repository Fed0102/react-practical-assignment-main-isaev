import React from 'react';
import styles from "./Search.module.css";

const Search = ({searchValue, setSearchValue}) => {

    return (
        <div className={styles.search}>
            <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className={styles.input}
                   placeholder={'Search'}/>
        </div>
    );
};

export default Search;