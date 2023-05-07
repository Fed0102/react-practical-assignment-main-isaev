import React, {useState} from 'react';
import styles from './EditPost.module.css';
import {useDispatch} from "react-redux";
import MyButton from "../UI/button/MyButton";
import {updatePost, uploadNewPostImage} from "../../redux/serverRequests";

const EditPost = ({setEditShow, post}) => {
    const [editValue, setEditValue] = useState(post.title);
    const [imageUpload, setImageUpload] = useState(null);
    const dispatch = useDispatch();

    const editPost = () => {
        const newPostInfo = {
            id: post.id,
            title: editValue,
            likes: post.likes,
            dislikes: post.dislikes
        }
        if (!imageUpload) {
            dispatch(updatePost(newPostInfo))
        } else {
            const formData = new FormData();
            formData.append('picture', imageUpload);
            const info = {
                id: post.id,
                file: formData
            }
            dispatch(uploadNewPostImage(info))
            dispatch(updatePost(newPostInfo))
        }
        setEditShow(false)
    }
    return (
        <div>
            <div>
                <div className={styles.thirdDiv}>
                    <p className={styles.p}>Edit your post:</p>
                    <MyButton onClick={() => setEditShow(false)}>Close</MyButton>
                </div>
                <div>
                    <input className={styles.input} value={editValue} onChange={(e) => setEditValue(e.target.value)}/>
                </div>
                <div className={styles.thirdDiv}>
                    <p className={styles.p}>Edit your file:</p>
                </div>
                <div>
                    <input
                        type={'file'}
                        accept={"image/*,.png,.jpg"}
                        onChange={(event) => {
                            setImageUpload(event.target.files[0])
                        }}/>
                </div>
                <MyButton onClick={() => editPost()}>Edit</MyButton>
            </div>
        </div>
    );
};

export default EditPost;