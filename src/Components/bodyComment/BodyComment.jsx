import React, {useEffect, useState} from 'react';
import styles from './BodyComment.module.css';
import {useDispatch, useSelector} from "react-redux";
import {
    editDisLikesComments,
    editLikesComment
} from "../../redux/slices/homeSlice";
import EditComment from "../editComment/EditComment";
import MyButton from "../UI/button/MyButton";
import MyModal from "../UI/modal/MyModal";
import {deleteComment, updateComment} from "../../redux/serverRequests";

const BodyComment = ({comment}) => {
    const user = useSelector(state => state.loginPage.login);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const likes = comment.likes.length - comment.dislikes.length;
    const dateFormat = new Date(JSON.parse(comment.date));
    const equal = user.toLowerCase() === comment.username.toLowerCase();

    useEffect(() => {
        dispatch(updateComment(comment))
    }, [likes])

    const payload = {
        postId: comment.postId,
        comId: comment.id,
        userName: user
    }
    const handlerDeleteComm = () => {
        const info = {
            postId: comment.postId,
            id: comment.id
        }
        dispatch(deleteComment(info));
    }
    const addLikeOnComment = () => {
        dispatch(editLikesComment(payload))

    }
    const deleteLikeOnComment = () => {
        dispatch(editDisLikesComments(payload))
    }

    return (
        <div className={styles.firstDiv}>
            <div className={styles.secondDiv}>
                <h4>{comment.username}</h4>
                {equal && <MyButton onClick={() => handlerDeleteComm()}>DeleteComment</MyButton>}
            </div>
            <div style={{marginBottom: '10px'}}>
                {comment.text}
            </div>
            <div>
                Likes: {likes}
            </div>
            <div>
                <MyButton onClick={() => deleteLikeOnComment()}>DislikeComment</MyButton>
                <MyButton onClick={() => addLikeOnComment()}>LikeComment</MyButton>
            </div>
            {equal && <MyButton onClick={() => setShow(true)}>EditComment</MyButton>}
            <p>Comment date: {dateFormat.toLocaleString('en-US', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            })}</p>
            <MyModal show={show} setShow={setShow}>
                {show && <EditComment comment={comment} setShow={setShow}/>}
            </MyModal>
        </div>
    );
};

export default BodyComment;