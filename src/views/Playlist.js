import React, { useState, useEffect, useRef, useContext } from 'react';
import Drawer from '../components/Drawer.js';
import CreatePlaylist from './CreatePlaylist.js';
import { useHistory } from 'react-router-dom';
const CreatePlaylistView = () => {
    const history = useHistory();


    return (
        <div>
            <Drawer>
                {/* All components */}
                <CreatePlaylist />
            </Drawer>
        </div>
    )
}


export default CreatePlaylistView;