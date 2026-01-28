import { createContext, useCallback, useContext, useEffect } from "react";
import { useState } from "react";


export const SetContext = createContext();

const SetContextProvider = (props) => {
    const [sidebar, setSidebar] = useState(false);
    const [category, setCategory] = useState(0);
    const [themeMode, setThemeMode] = useState("light");
    const [videos, setVideos] = useState([]);
    const [userData, setUserData] = useState(null);


    const themeChanger = () => {
        setThemeMode((prev) => prev==="light" ? "dark" : "light")
    }

    // const login = useCallback((data) => {
    //     setUserData(data)
    // }, [])

    // const logout = useCallback((data) => {
    //     setUserData(null)
    // }, [])



    const contextValue = {
        sidebar,
        setSidebar,
        category,
        setCategory, 
        themeMode,
        setThemeMode,
        themeChanger,
        videos,
        setVideos,
        userData,
        setUserData
    }

    return (
        <SetContext.Provider value={contextValue}>
            {props.children}
        </SetContext.Provider>
    )
}

export default SetContextProvider;