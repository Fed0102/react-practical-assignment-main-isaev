import React, {useState} from 'react';
import styles from './AddPost.module.css';
import {useDispatch, useSelector} from "react-redux";
import MyButton from "../UI/button/MyButton";
import {fetchNewPost, uploadNewPostImage} from "../../redux/serverRequests";
const AddPost = ({setShow}) => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const userName = useSelector(state => state.loginPage.login);
    const [imageUpload, setImageUpload] = useState(null);
    const id = useSelector(state => state.homePage.id);
    const handleAddPost = () => {
        const formData = new FormData();
        formData.append('picture', imageUpload);
        const info = {
            id: id,
            file: formData
        }
        dispatch(uploadNewPostImage(info))
        dispatch(fetchNewPost({title, userName}))
        setShow(false)
    }

    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.secondDiv}>
                    <p className={styles.p}>Create new post</p>
                    <MyButton onClick={() => setShow(false)}>Close</MyButton>
                </div>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className={styles.input}
                       placeholder={'Enter your text'}/>
                <div className={styles.wrapper}>
                    <p className={styles.p}>Choose file</p>
                    <input onChange={(event) => {
                        setImageUpload(event.target.files[0])
                    }}
                           accept={"image/*,.png,.jpg"}
                           type={'file'}/>
                    <div>
                        <MyButton onClick={() => handleAddPost()}>Create</MyButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPost;