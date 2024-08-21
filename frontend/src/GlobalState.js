import { createContext } from "react";
import { useState } from "react";
import ProductAPI from "./api/productAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    // productAPI();

    const [token, setToken] = useState(false);

    const state = {
        token: [token, setToken],
        productAPI: ProductAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
};
