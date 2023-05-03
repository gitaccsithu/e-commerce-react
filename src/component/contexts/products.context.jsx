import { createContext, useState } from "react";
import SHOP_DATA from '../../shop_data.json';

export const ProductContext = createContext({
    currentProducts: [],
    setCurrentProducts: () => null
})

export const ProductContextProvider = ({children}) => {
    const [currentProducts, setCurrentProducts] = useState(SHOP_DATA);
    const value = {currentProducts};

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}