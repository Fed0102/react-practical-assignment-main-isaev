import React, {useEffect, useState} from 'react';
import styles from './Main.module.css';
import {useDispatch, useSelector} from "react-redux";
import Search from "../search/Search";
import BodyPost from "../bodyPost/BodyPost";
import Pagination from "../paginations/Pagination";
import AddPost from "../addPost/AddPost";
import MyButton from "../UI/button/MyButton";
import MyModal from "../UI/modal/MyModal";
import {fetchPosts, filteredPosts} from "../../redux/serverRequests";


const Main = () => {
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const {error, pageNumber, posts} = useSelector(state => state.homePage)


    useEffect(() => {
        dispatch(fetchPosts(pageNumber));

        if (searchValue) {
            dispatch(filteredPosts(searchValue))
        }
    }, [searchValue, pageNumber, error])

    return (
        <div className={styles.wrapper}>
            <div className={styles.inputButton}>
                <MyButton onClick={() => setShow(true)} className={styles.addBtn}>Add post</MyButton>
                <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div>
            <div className={styles.items}>
                {posts.map((post) => <BodyPost post={post} key={post.id}/>)}
            </div>
            <Pagination/>
            <MyModal show={show} setShow={setShow}>
                {show && <AddPost setShow={setShow}/>}
            </MyModal>
        </div>
    );
};

export default Main;
