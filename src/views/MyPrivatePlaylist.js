import React, { useState, useEffect, useRef, useContext } from 'react';
import Drawer from '../components/Drawer.js';
import MyPrivatePlaylist from '../components/users/MyPrivatePlaylist.js';

const MyPrivatePlaylistView = () => {
    return (    
        <div>
            <Drawer>
                {/* All components */}
                <MyPrivatePlaylist />
            </Drawer>
        </div>
    )
}


export default MyPrivatePlaylistView;