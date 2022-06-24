import React, { useState, useEffect, useRef, useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext.js';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import Checkbox from '@mui/material/Checkbox';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));




const CreatePlaylist = () => {
    const classes = useStyles();
    const state = useContext(GlobalContext);
    const [values, setValues] = React.useState({
        playlistName: '',
        isPublic: true,
    });

    async function getApi(url) {

        let token = localStorage.getItem("access_token");

        let res = await axios.put(url + 'movies/create-playlist/',
            {
                "playlistName": values.playlistName,
                "isPublic": values.isPublic
            }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        console.log(res);

    }

    const history = useHistory();
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const submitForm = () => {
        // Make Request Here
        try {
            // console.log(values.playlistName)
            getApi(state.url, values)
                .then(res => {
                    state.toggleLogin();
                    history.push("/")
                })
        }
        catch (err) {
            console.log(err);
        }
    }
    const [checked, setChecked] = React.useState(true);

    const handleChange1 = (event) => {
        setChecked(event.target.checked);
        setValues({ ...values, isPublic: event.target.checked});

    };

    return (
        <>
            <Card
                style={{
                    maxWidth: "600px",
                    margin: "auto"
                }}
            >

                <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
                    Create Playlist
                </Typography>

                <Divider />

                <div
                    style={{ width: "100%", padding: "20px" }}
                >
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-text">Playlist Name</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-text"
                            value={values.playlistName}
                            onChange={handleChange('playlistName')}
                            startAdornment={<InputAdornment position="start"></InputAdornment>}
                            labelWidth={60}
                            type="text"
                        />
                    </FormControl>

                    <div style={{ padding: "20px" }} />

                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Public Playlist</InputLabel>
                        <Checkbox
                            style={{color : "black"}}
                            checked={checked}
                            onChange={handleChange1}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </FormControl>
                </div>

                <div
                    style={{
                        textAlign: "center"
                    }}
                >
                    <Button variant="contained" color="primary"
                        style={{
                            margin: "10px auto",
                            textAlign: "center",
                            backgroundColor : "black"
                        }}

                        onClick={() => submitForm()}
                    >
                        Create
                    </Button>
                </div>

            </Card>
        </>
    )
}


export default CreatePlaylist;