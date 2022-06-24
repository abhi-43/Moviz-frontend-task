import React, { useContext , useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { GlobalContext } from '../contexts/GlobalContext.js';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import DialogLogout from './users/DialogLogout.js';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import KeyIcon from '@mui/icons-material/Key';
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import MovieComponent from './MovieComponent';
import axios from 'axios';
import Tooltip from "@material-ui/core/Tooltip";
import toast from 'react-hot-toast';



const drawerWidth = 240;


const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 100%;
  background-color: white;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 50px;
  padding: 30px;  
  gap: 25px;
  justify-content: space-evenly;;
`;
const EmptyMovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size : 30px;
  margin-top: 200px;
  margin-right : 900px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [dialog, setDialog] = React.useState(false);  //todo
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const { drawer, name, changeName, deleteName, loggedIn } = useContext(GlobalContext);

  const [items, setItems] = React.useState([
    {
      text: "Home",
      link: "/",
      _disabled: (localStorage.getItem("access_token") ? false : true)
      
      
    },
    {
      text: "Create Playlist",
      link: "/create-playlist",
      _disabled: (localStorage.getItem("access_token") ? false : true)
    },
    {
      text: "My Playlist",
      link: "/my-playlist",
      _disabled: (localStorage.getItem("access_token") ? false : true)
    }
    ,{
      text: "All Playlist",
      link: "/all-playlist",
      _disabled: (localStorage.getItem("access_token") ? false : true)
    }
  ])
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [searchQuery, setSearchQuery] = useState("");
const [timeoutId, setTimeoutId] = useState();
const [movieList, setMovieList] = useState([]);


const fetchData = async(search) => {
    const response = await axios.get(`https://www.omdbapi.com/?s=${search}&apikey=816f62f1`);
    setMovieList(response.data.Search);
}


const onTextChange = (e) => {
    clearTimeout(timeoutId);
    setSearchQuery(e.target.value);
    const timeout = setTimeout(() => 
    fetchData(e.target.value), 500);
    setTimeoutId(timeout);
    
}

const handleClick = (isDisable , link , index) => {
  
  if(!isDisable || index===0)
    history.push(link)
  else {
    toast.error("First Login")
    history.push("/login")
  }
}

  const logout = () => {
    //
    setDialog(true);
    console.log(dialog);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{ backgroundColor : "black" }}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4">
            {drawer}
          </Typography>

          <div
                style={{
                    marginLeft : '1rem' , 
                    width : "60%" ,
                    alignSelf : "center"
                }}
            >
{props.isShow && (
    <Container>
        <SearchBox>
            <SearchIcon style={{ color : "black"}}/>
            <SearchInput placeholder='Search Movies...' value={searchQuery} onChange={onTextChange} />
        </SearchBox>
    </Container>
)}
            </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%"
            }}
          >

            {!loggedIn ? (
              <div>
                <Button
                  variant="contained"
                  color="default"
                  className={classes.button}
                  startIcon={<AddToHomeScreenIcon />}
                  style={{
                    marginLeft: "10px"
                  }}
                  onClick={() => history.push('/login')}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  className={classes.button}
                  startIcon={<AddToPhotosIcon />}
                  style={{
                    marginLeft: "10px"
                  }}
                  onClick={() => history.push('/register')}
                >
                  Register
                </Button>
              </div>
            ) :
              (
                <Button
                  variant="contained"
                  color="default"
                  className={classes.button}
                  startIcon={<ExitToAppIcon />}
                  style={{
                    marginLeft: "10px"
                  }}
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              )
            }

          </div>

          <DialogLogout dialog={dialog} setDialog={setDialog} />


        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
       
          {items.map(({ text, link, _disabled }, index) => (
             <Tooltip title={text} aria-label={text} placement="right" arrow>
            <ListItem button key={text}
              onClick={() => handleClick(_disabled === true , link , index)}
            >
              <ListItemIcon>

                {index == 0 && <HomeIcon /> }
                {index == 1 && <PlaylistAddIcon /> }
                {index == 2 && <SubscriptionsIcon /> }
                {index == 3 && <PlaylistPlayIcon /> }
                
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            </Tooltip>
          ))}
         
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
      {(props.isShow && movieList && movieList.length > 0) ? 
        (<MovieListContainer>
        {(movieList.map((movie, index) => (
            <MovieComponent key={index} movie={movie} />
          ))
        )}
        </MovieListContainer>) : ( props.isShow ?
        <EmptyMovieListContainer>
            No movies to show  
        </EmptyMovieListContainer> : <></>)}
    </div>
  );
}
