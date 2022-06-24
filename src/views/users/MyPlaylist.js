import React, { useState, useEffect, useRef, useContext } from 'react';
import Drawer from '../../components/Drawer.js';
import MyPlaylist from '../../components/users/MyPlaylist.js';
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';

const MyPlaylistView = () => {
    const history = useHistory();

    return (    
        <div>
            <Drawer
            >
                <Box sx={{ display: 'flex', justifyContent: "space-around" }}>
                    <MyPlaylist 
                        topic="My Public Playlist"
                        paragraph="Click here to view only your public playlist."
                        link="/my-public-playlist"
                        image="https://icons.iconarchive.com/icons/papirus-team/papirus-mimetypes/256/playlist-icon.png"
                    />
                    <MyPlaylist 
                         topic="My Private Playlist"
                         paragraph="Click here to view your private playlist."
                         link="/my-private-playlist"
                         image="https://i1.sndcdn.com/artworks-wijELnUyXMcdE7yC-eHb49g-t500x500.jpg"
                    />
                </Box>
                {/* My components */}
                
            </Drawer>
        </div>
    )
}


export default MyPlaylistView;