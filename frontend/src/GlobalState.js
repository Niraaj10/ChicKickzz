import { createContext, useEffect } from "react";
import { useState } from "react";
import ProductAPI from "./api/productAPI";
import axios from "axios";
import UserAPI from "./api/UserAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    // productAPI();

    const [token, setToken] = useState(false);

    const refToken = async () => {
        // const res = await axios.get('/user/refTokenn')
        const res = await axios.post('/user/refTokenn')

        // console.log(res)
        setToken(res.data.accesstoken)
    }

    useEffect(() => {
        const LoginUser = localStorage.getItem('Login User')

        if(LoginUser) refToken()
         
    }, []);

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


// import { createContext, useEffect } from "react";
// import ProductAPI from "./api/ProductAPI";
// import { useState } from "react";
// import axios from "axios";
// import UserAPI from "./api/UserAPI";

// export const GlobalState = createContext()

// export const DataProvider = ({children}) => {

//     const [token,setToken] = useState(false)

//     const refreshToken = async () => {
//         const res = await axios.get('/user/refresh_token')

//         setToken(res.data.accesstoken)
//     }

//     useEffect(()=>{
//         const firstLogin = localStorage.getItem('firstLogin')
//         if(firstLogin) refreshToken()
//     },[])

//     const state = {
//         token: [token,setToken],
//         productsAPI:ProductAPI(),
//         // userAPI:UserAPI(token)
//     }

//     return(
//         <GlobalState.Provider value={state}>
//             {children}
//         </GlobalState.Provider>
//     )
// }