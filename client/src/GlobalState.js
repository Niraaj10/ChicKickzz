import { createContext, useEffect } from "react";
import { useState } from "react";
import ProductAPI from "./api/productAPI";
import axios from "axios";
import UserAPI from "./api/UserAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    // const SERVER_URL = 'https://chickickzz-1.onrender.com';
    const SERVER_URL = 'http://localhost:5000';
    // productAPI();

    // const [token, setToken] = useState(false);
    const [loginUser, setLoginUser] = useState('');

    // const refToken = async () => {
    //     // const res = await axios.get('/user/refTokenn')
    //     const res = await axios.get(`${SERVER_URL}/user/refToken`)
    //     // const res = await axios.get('https://chickickzz-3.onrender.com/user/refToken', data, {
    //     //     withCredentials: true,
    //     // });

    //     // console.log(res)
    //     // setToken(res.data.accesstoken)
    //     setToken(res.data.refToken)
    // }

    useEffect(() => {
        // const LoginUser = localStorage.getItem('Login User')

        /////////////////////////////////////////////////////
        // if(LoginUser) refToken()
        // if (loginUser) {
        //     refToken();
        // }

        const loginUserFromStorage = localStorage.getItem('Login User');
        if (loginUserFromStorage) {
            setLoginUser(loginUserFromStorage);
        }
         
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
        // token: [token, setToken],
        productAPI: ProductAPI(),
        userAPI: UserAPI(),
        loginUser: [loginUser, setLoginUser]
    }
    // console.log(UserAPI)

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
};
