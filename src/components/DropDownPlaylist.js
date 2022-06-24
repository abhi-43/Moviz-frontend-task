import React, { useState, useContext, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import axios from 'axios';
import { GlobalContext } from '../contexts/GlobalContext.js';
import Select from '@mui/material/Select';
import InputLabel from '@material-ui/core/InputLabel';


export default function DropDownPlaylist({ setPlayid }) {
    const state = useContext(GlobalContext);
    const [personName, setPersonName] = React.useState([]);
    const [selected, setSelected] = React.useState();
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

    const handleChange = (event) => {
        setPlayid(event.target.value);
        setSelected(event.target.value);
    };

    return (
        <div>
            {personName.length > 0 ?
            (
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel htmlFor="list-native-helper">Playlists</InputLabel>
                <NativeSelect
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={selected}
                    onChange={handleChange}
                    inputProps={{
                        name: '_id',
                        id: 'list-native-helper',
                      }}
                >

                    <option aria-label="None" value="" />
                    {personName.map((name) => (
                        <option  value={name._id}>{name.playlistName}</option>
                    ))}
                </NativeSelect>
            </FormControl>
            ):
                (
                    <div style={{fontSize : "16px" , marginRight : "10px"}}>First Create Playlist</div>
                )}
        </div>
    );
}