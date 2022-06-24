import React, { useState, useEffect, useRef, useContext } from 'react';
import Drawer from '../components/Drawer.js';
import PublicMovieComponent from '../components/PublicMovieComponent.js';
import axios from 'axios';
import { GlobalContext } from '../contexts/GlobalContext.js';
import styled from "styled-components";


const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 50px;
  padding: 30px;  
  gap: 25px;
  justify-content: space-evenly;;
`;

const MyPublicPlaylistView = () => {
    const state = useContext(GlobalContext);
    const [movieIds , setMovieIds] = useState([]);
    
    useEffect(async () => {

        let token = localStorage.getItem("access_token");
        // console.log(token)
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        try {
            axios.get(state.url + "movies" +`${window.location.pathname}` , config)
                .then(data => {
                    return data.data;
                })
                .then(data => {
                    return (data.data);

                }).then(p => {
                    setMovieIds(p.movies);
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

                {movieIds && (
                    <MovieListContainer>
                    {movieIds.map(item => (
                    <PublicMovieComponent  id={item}/>
                ))}
                </MovieListContainer>
                )}
                
            </Drawer>
        </div>
    )
}


export default MyPublicPlaylistView;