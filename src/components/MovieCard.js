import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import DropDownPlaylist from './DropDownPlaylist'
import axios from 'axios';


import { GlobalContext } from '../contexts/GlobalContext.js';

export default function MovieCard({ setOpen, details }) {
    const [playid, setPlayid] = React.useState();
    const state = React.useContext(GlobalContext);
    const [msg, setmsg] = React.useState(false);
    const history = useHistory();
        
    async function handleClick(e) {
        let token = localStorage.getItem("access_token");
        if(!token) {
            history.push('/login');
        } else {

        try {
            let res = await axios.put(state.url + 'movies/add-into-playlist/',
                {
                    "playlistId": playid,
                    "movieId": details.imdbID
                }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })

            setOpen(false);
            setmsg(false);
        }
        catch(err) {
            setmsg(true);
        }
    }
}


    return (
        <Card sx={{ maxWidth: 1000 }}>
            
            <CardActions>
                <DropDownPlaylist setPlayid={setPlayid} />
                
                {(playid !== undefined) && (<Button variant="contained" disabled={playid === undefined ? true : false} size="small" style={{ backgroundColor : "black"}} onClick={handleClick}>ADD To Playlist</Button>)}
                
            </CardActions>
            {
            msg && (<div style={{padding:"10px", color:"red",
            display:"flex", justifyContent:"center"}}>
                Movie already exist in playlist
            </div>)
            }
        </Card>
    );
}