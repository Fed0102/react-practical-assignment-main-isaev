import React from 'react';
import styles from './Header.module.css';
import {useDispatch, useSelector} from "react-redux";
import {deleteUser} from "../../redux/slices/loginSlice";
import MyButton from "../UI/button/MyButton";
const Header = () => {

    const login = useSelector(state => state.loginPage.login)
    const dispatch = useDispatch();
    const logOut = ()=>{
        dispatch(deleteUser());
    }
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.login}>
                {login}
            </h2>
            <MyButton onClick={()=>logOut()}>
                Logout
            </MyButton>
        </div>
    );
};

export default Header;