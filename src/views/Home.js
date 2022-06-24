import React, { useState, useEffect, useRef, useContext } from 'react';
import Drawer from '../components/Drawer.js';

const HomeView = () => {
    return (    
        <div>
            <Drawer isShow={true}>
                <img 
                    style={{
                        position: "absolute",
                        width: "100%",
                        overflow: "hidden",
                        opacity: ".9",
                        top: "0px",
                        left: "0px",
                        zIndex: "-1"
                    }}
                    src=""
                />
            
            </Drawer>
        </div>
    )
}


export default HomeView;