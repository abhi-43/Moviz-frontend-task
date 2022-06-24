import React, { Component, useEffect, useState, createContext } from 'react';

export const GlobalContext = createContext();



const GlobalContextProvider = (props) => {
    const [drawer, setDrawer] = useState("MOVIZ");
    const [loggedIn, setLoggedIn] = useState(false);
    const [loader, setLoader] = useState(true);
    const [url, setUrl] = useState("http://localhost:8800/")
    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            setLoggedIn(true);
        }

    }, [])
    const [name, setName] = useState("simranjeet");

    const changeName = (newName) => {
        setName(newName);
    }

    const deleteName = () => {
        setName(null);
    }

    const toggleLoader = () => {
        setLoader(false);
    }

    const toggleLogin = () => {
        setLoggedIn(!loggedIn);
    }

    return (
        <GlobalContext.Provider value={{ drawer, name, changeName, deleteName, loggedIn, loader, toggleLoader, url, toggleLogin }}>
            {props.children}
        </GlobalContext.Provider>
    );
}

export default GlobalContextProvider;