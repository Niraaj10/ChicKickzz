import { createContext, useEffect } from "react";
import { useState } from "react";
import ProductAPI from "./api/productAPI";
import axios from "axios";
import UserAPI from "./api/UserAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    // productAPI();

    const [token, setToken] = useState(false);
    // const [loginUser, setLoginUser] = useState('');

    const refToken = async () => {
        // const res = await axios.get('/user/refTokenn')
        const res = await axios.post('/user/refTokenn')

        // console.log(res)
        setToken(res.data.accesstoken)
    }

    useEffect(() => {
        const LoginUser = localStorage.getItem('Login User')

        /////////////////////////////////////////////////////
        if(LoginUser) refToken()
        // if (loginUser) {
        //     refToken();
        // }
         
    }, []);
    // }, [loginUser]);



    // useEffect(() => {
    //     const handleStorageChange = () => {
    //         setLoginUser(localStorage.getItem('Login User'));
    //     };

    //     window.addEventListener('storage', handleStorageChange);

    //     return () => {
    //         window.removeEventListener('storage', handleStorageChange);
    //     };
    // }, []);

    const state = {
        token: [token, setToken],
        productAPI: ProductAPI(),
        userAPI: UserAPI(token)
    }
    // console.log(UserAPI)

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
};
