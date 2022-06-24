import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import ListItemButton from '@mui/material/ListItemButton';

import Movies from './Movies';
export default function AllPlaylist({name, id, by, movies}) {
    
    const [details, setDetails] = React.useState([])
    
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
          <Avatar alt="Cindy Baker" src="https://img.freepik.com/free-vector/playlist-neon-sign-black-brick-wall_77399-755.jpg?size=338&ext=jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
          <div>naya</div>
          </>
          }
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