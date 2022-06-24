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
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        try {
            axios.get(state.url + "movies/myplaylist/", config)
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
                    setPersonName(d);

                })
        }
        catch (err) {
            console.log(err);
        }
    }, [])


    return (    
        <div>
                {
                    personName.map((data) => {
                        if(!data.isPublic) 
                            return (<AllPlaylist id={data._id} name={data.playlistName} by={data.user} movies={data.movies} />)
                    })
                }
        </div>
    )
}


export default AllPlaylistView;