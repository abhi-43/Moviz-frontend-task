import React, { useState, useEffect, useRef, useContext } from 'react';
import Drawer from '../../components/Drawer.js';
import Login from '../../components/users/Login.js';
import {useHistory} from 'react-router-dom';
const LoginView = () => {
    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem("access_token")) {
            history.push("/");
        }
    }, []);
    return (    
        <div>
            <Drawer>
                {/* All components */}
                <Login />
            </Drawer>
        </div>
    )
}


export default LoginView;