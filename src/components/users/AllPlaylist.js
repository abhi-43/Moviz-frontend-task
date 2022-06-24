import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from 'axios';
import { GlobalContext } from '../../contexts/GlobalContext.js';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';


import Movies from './Movies';
export default function AllPlaylist({ isPublic,name, id, by, movies}) {
  
    const history = useHistory();
    const state = React.useContext(GlobalContext);
    
    const deletePlaylist = async (id) => {
      let token = localStorage.getItem("access_token");
      let res = await axios.delete(state.url + `movies/delete-playlist/${id}`,
                {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
      if(res.status === 200){
        if(res.data === "deleted succesfully"){
          toast.success(res.data)
          history.push("/my-playlist");
          
        }
        else {
          toast.error(res.data)
        }
      }
      else{
        toast.error("Unable to delete , Try again")
      }
    }
    const copyToClipboard = (id) => {
      console.log("happen" , id)
        navigator.clipboard.writeText(`${window.location.origin}/playlist/${id}`);
        toast.success("copied to clipboard")
    }

    function handleClick() {
        console.log(movies)
    }
    return (
    <List sx={{ width: '100%', padding: "10px", bgcolor: 'background.paper' }}
        style={{
            boxShadow: "10px 0px 20px 10px rgba(0, 0, 0, .1)",
            borderRadius: "20px",
            marginBottom: "10px"
        }}

        onClick={() => handleClick()}
    >
      
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="https://icons.iconarchive.com/icons/papirus-team/papirus-mimetypes/256/playlist-icon.png" />
        </ListItemAvatar>
        <ListItemText
          primary={<>
            <div>{name}</div>
            {isPublic && <ContentCopyIcon style={{cursor : "pointer" ,marginRight : "10px" , marginBottom : '5px' , float : "right"}} onClick={() => copyToClipboard(id)}/>}
            <DeleteIcon style={{cursor : "pointer" ,marginRight : "10px" , marginBottom : '5px' , float : "right"}} onClick={() => deletePlaylist(id)} />
            </>}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {by}
              </Typography>
                {

                    movies.map((data) => {
                        return (
                            <Movies imdbID={data} />
                        )
                    })
                }
             </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}