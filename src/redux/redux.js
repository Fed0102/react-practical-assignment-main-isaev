import {configureStore} from "@reduxjs/toolkit";
import LoginPageSlice from "./slices/loginSlice";
import HomePageSlice from "./slices/homeSlice";

export default configureStore({
    reducer: {
        loginPage: LoginPageSlice,
        homePage: HomePageSlice,
    }
})