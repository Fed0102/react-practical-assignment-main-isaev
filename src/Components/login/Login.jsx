import React, {useState} from 'react';
import styles from './Login.module.css'
import {useDispatch} from "react-redux";
import {addUser} from "../../redux/slices/loginSlice";
import MyButton from "../UI/button/MyButton";

const Login = () => {
    const [login, setLogin] = useState('');
    const dispatch = useDispatch();

    const enterYourName = () => {
        dispatch(addUser(login))
    }

    return (
        <div className={styles.wrapper}>
            <h1> Enter your name:</h1>
            <form onSubmit={enterYourName}>
                <input
                    className={styles.input}
                    value={login}
                    placeholder={'Enter your name'}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <MyButton type="submit">Login</MyButton>
            </form>
        </div>
    );
};

export default Login;