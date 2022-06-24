import React, { useState, useEffect, useRef, useContext } from 'react';
import Drawer from '../../components/Drawer.js';
import Register from '../../components/users/Register.js';
import { useHistory } from 'react-router-dom';

const RegisterView = () => {
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
                <Register />
            </Drawer>
        </div>
    )
}


export default RegisterView;