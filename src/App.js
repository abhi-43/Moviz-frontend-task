import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Views
import NotFound from './views/NotFound.js'
import Login from './views/users/Login.js'
import Register from './views/users/Register.js'
import CreatePlaylist from './views/Playlist.js'

import AllPlaylist from './views/users/AllPlaylist.js'
import MyPlaylist from './views/users/MyPlaylist.js'

import MyPrivatePlaylist from './views/MyPrivatePlaylist.js'
import MyPublicPlaylist from './views/MyPublicPlaylist.js'
import PublicPlaylist from './views/PublicPlaylist.js'

import Home from './views/Home.js'
import CircularProgress from '@mui/material/CircularProgress';
//Context
import GlobalContextProvider from './contexts/GlobalContext.js';
import {Toaster} from 'react-hot-toast';

function App() {
  const [loader, setLoader] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
      console.log(loader);
    }, 3000);
  }, [])
  return (
    <>
    <div>
    <Toaster
      position="top-right"
      toastOptions={{
        success: {
          theme: {
            primary: '#4aed88',
          },
        },
        error: {
          theme: {
            primary: '#FF0000',
          },
        },
      }}>
    </Toaster>
  </div>
    loader ?
      (
        <CircularProgress /> 
      )
      :
      (
        <GlobalContextProvider>
          <Router>
            <Switch>

              <Route path="/" exact> <Home/> </Route>

              <Route path="/login" exact> <Login /></Route>

              <Route path="/register" exact> <Register /></Route>

              <Route path="/create-playlist" exact> <CreatePlaylist /></Route>

              <Route path="/my-playlist" exact> <MyPlaylist /></Route>

            <Route path="/all-playlist" exact> <AllPlaylist /></Route>

            <Route path="/my-public-playlist" exact> <MyPublicPlaylist /></Route>

            <Route path="/playlist/:id"> <PublicPlaylist /></Route>

            <Route path="/my-private-playlist" exact> <MyPrivatePlaylist /></Route>
              
              <Route path="*">
                <NotFound /></Route>
            </Switch>
          </Router>
        </GlobalContextProvider>
      )
      </>
  );
}

export default App;