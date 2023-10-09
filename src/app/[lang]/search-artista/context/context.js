import { useState } from "react";
import { createContext } from "react";

const myContext = createContext({})

export const MyProvider = ({ children }) => {
    const [imageUrls, setImageUrls] = useState([]);
    function save() {

    }

    return (
        <myContext.Provider value={{
            imageUrls: imageUrls,
            setImageUrls: setImageUrls,
            save: save
        }}>
            {children}
        </myContext.Provider>
    )
}

export default myContext