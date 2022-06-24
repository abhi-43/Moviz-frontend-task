import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useHistory } from 'react-router-dom';
export default function MyPlaylistView({topic, paragraph, link, image}) {
  const history = useHistory();
  
  
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="130"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {topic}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {paragraph}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" style={{marginLeft: "auto" , backgroundColor : "black"}} onClick={() => history.push(link)}>Check</Button>
      </CardActions>
    </Card>
  );
}