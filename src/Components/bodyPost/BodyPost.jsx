import React, {useEffect, useState} from 'react';
import styles from './BodyPost.module.css';
import {useDispatch, useSelector} from "react-redux";
import {editDisLikesPost, editLikesPost} from "../../redux/slices/homeSlice";
import AddComment from "../AddComment/AddComment";
import EditPost from "../editPost/EditPost";
import MyButton from "../UI/button/MyButton";
import MyModal from "../UI/modal/MyModal";
import BodyComment from "../bodyComment/BodyComment";
import {deletePost, updatePost} from "../../redux/serverRequests";

const BodyPost = ({post}) => {
    const [comShow, setComShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const user = useSelector(state => state.loginPage.login)
    const likes = post.likes.length - post.dislikes.length;
    const equal = user.toLowerCase() === post.username.toLowerCase();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updatePost(post))
    }, [likes])
    const handleDeletePost = (id, user) => {
        dispatch(deletePost(id, user));
    }
    const like = (id, user) => {
        dispatch(editLikesPost(id, user));
    }
    const dislike = (id, user) => {
        dispatch(editDisLikesPost(id, user))
    }
    const formatDate = (date) => {
        const options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};
        return new Date(JSON.parse(date)).toLocaleString('en-US', options);
    };

    return (
        <div className={styles.root}>
            <div>
                <div className={styles.fourDiv}>
                    <span className={styles.name}>{post.username}</span>
                    {equal && <MyButton onClick={() => handleDeletePost(post.id)}>Delete post</MyButton>}
                </div>
                {post.imageSrc &&
                    <div className={styles.frame}>
                        <img src={post.imageSrc} alt={'img'}/>
                    </div>}
                <p>{post.title}</p>
            </div>
            <span>Likes: {likes}</span>
            <div>
                <MyButton onClick={() => dislike({id: post.id, user: user})}>Dislike post</MyButton>
                <MyButton onClick={() => like({id: post.id, user: user})}>Like post</MyButton>
            </div>
            {equal && <MyButton onClick={() => setEditShow(true)}>Edit post</MyButton>}
            <MyButton onClick={() => setComShow(true)}>Add comment</MyButton>
            <p>Post date: {formatDate(post.date)}</p>
            <h4>Comments:</h4>
            {post.comments.map((comment) => <BodyComment comment={comment} key={comment.id}/>)}
            <MyModal setShow={setComShow} show={comShow}>
                {comShow && <AddComment setComShow={setComShow} post={post}/>}
            </MyModal>
            <MyModal setShow={setEditShow} show={editShow}>
                {editShow && <EditPost post={post} setEditShow={setEditShow}/>}
            </MyModal>
        </div>
    );
};

export default BodyPost;