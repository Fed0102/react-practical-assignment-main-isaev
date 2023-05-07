import React, {useState} from 'react';
import styles from './AddComment.module.css';
import {useDispatch, useSelector} from "react-redux";
import MyButton from "../UI/button/MyButton";
import {createNewComment} from "../../redux/serverRequests";

const AddComment = ({post, setComShow}) => {
    const [comValue, setComValue] = useState('');
    const userName = useSelector(state => state.loginPage.login);
    const dispatch = useDispatch();

    const comment = {
        text: comValue,
        postId: post.id,
        userName: userName,
    }
    const createComment = () => {
        dispatch(createNewComment(comment));
        setComValue('');
        setComShow(false);
    }

    return (
        <div>
            <div className={styles.secondDiv}>
                <p>
                    Create new comment
                </p>
                <MyButton onClick={() => setComShow(false)}>
                    Close
                </MyButton>
            </div>
            <div className={styles.thirdDiv}>
                <input
                    className={styles.input}
                    value={comValue}
                    onChange={(e) => setComValue(e.target.value)}
                />
                <MyButton onClick={() => createComment()}>
                    Create
                </MyButton>
            </div>
        </div>

    );
};

export default AddComment;