import React, { useState, useEffect, useRef, useContext } from 'react';
import Drawer from '../components/Drawer.js';
import MyPublicPlaylist from '../components/users/MyPublicPlaylist.js';

const MyPublicPlaylistView = () => {
    return (    
        <div>
            <Drawer>
                {/* All components */}
                <MyPublicPlaylist />
            </Drawer>
        </div>
    )
}


export default MyPublicPlaylistView;