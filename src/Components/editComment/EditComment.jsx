import React, {useState} from 'react';
import styles from './EditComment.module.css';
import {useDispatch} from "react-redux";
import MyButton from "../UI/button/MyButton";
import {updateComment} from "../../redux/serverRequests";

const EditComment = ({setShow, comment}) => {
    const [value, setValue] = useState(comment.text);
    const dispatch = useDispatch();

    const commInfo = {
        id: comment.id,
        text: value,
        postId: comment.postId,
    }
    const edit = () => {
        dispatch(updateComment(commInfo));
        setShow(false);
    }

    return (
        <div>
            <div className={styles.secondDiv}>
                <h2>Edit comment:</h2>
                <MyButton onClick={() => setShow(false)}>
                    Close
                </MyButton>
            </div>
            <div className={styles.thirdDiv}>
                <input
                    className={styles.input}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}/>
                <MyButton onClick={() => edit()}>
                    Edit
                </MyButton>
            </div>
        </div>
    );
};

export default EditComment;