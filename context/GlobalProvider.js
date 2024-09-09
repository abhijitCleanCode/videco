import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    // declare all values that we want our app to have to
    const [isLogged, setIsLogged] = useState(false)
    const [user, setUser] = useState(null)
    // initially true as we are first loading that user
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                // check if response exist
                if(res) {
                    setIsLogged(true)
                    setUser(res)
                } else {
                    setIsLogged(false)
                    setUser(null)
                }
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setIsLoading(false)
            })

    }, []) // empty dependency array, bcz run only at start

    return (
        <GlobalContext.Provider
            value={{
                isLogged, setIsLogged,

                user, setUser,

                isLoading
            }}
        >
            { children }
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalProvider