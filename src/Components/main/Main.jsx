import React, {useEffect, useState} from 'react';
import styles from './Main.module.css';
import {useDispatch, useSelector} from "react-redux";
import Search from "../search/Search";
import BodyPost from "../bodyPost/BodyPost";
import Pagination from "../paginations/Pagination";
import AddPost from "../addPost/AddPost";
import MyButton from "../UI/button/MyButton";
import MyModal from "../UI/modal/MyModal";
import {fetchPosts, filterAndSearchPost} from "../../redux/serverRequests";

const Main = () => {
    const [search, setSearch] = useState('');
    const [show, setShow] = useState(false);
    const {error, pageNumber, posts} = useSelector(state => state.homePage);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchPosts(pageNumber));
        if (search) {
            dispatch(filterAndSearchPost(search))
        }
    }, [search, pageNumber, error])

    return (
        <div className={styles.wrapper}>
            <div className={styles.inputButton}>
                <MyButton onClick={() => setShow(true)}>
                    Add post
                </MyButton>
                <Search searchValue={search} setSearchValue={setSearch}/>
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
