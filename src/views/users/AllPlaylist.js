import React, { useState, useEffect, useRef, useContext } from 'react';
import Drawer from '../../components/Drawer.js';
import AllPlaylist from '../../components/users/AllPlaylist.js';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../../contexts/GlobalContext.js';

const AllPlaylistView = () => {
    const state = useContext(GlobalContext);
    const history = useHistory();
    const [personName, setPersonName] = React.useState([]);
    useEffect(async () => {

        let token = localStorage.getItem("access_token");
        // console.log(token)
     
        try {
            axios.get(state.url + "movies/public-playlist/")
                .then(data => {
                    console.log(data);
                    return data.data;
                })
                .then(data => {
                    return (data.data);

                }).then(p => {
                    p = Object.entries(p);
                    let d = []

                    for (let i = 0; i < p.length; i++) {
                        d.push(p[i][1]);
                    }
                    console.log(d);
                    setPersonName(d);

                })
        }
        catch (err) {
            console.log(err);
        }
    }, [])


    return (    
        <div>
            <Drawer>
                {/* All components */}
                {
                    personName.map((data) => {

                        return (<AllPlaylist isPublic = {true} id={data._id} name={data.playlistName} by={data.user} movies={data.movies} />)
                    })
                }
            </Drawer>
        </div>
    )
}


export default AllPlaylistView;