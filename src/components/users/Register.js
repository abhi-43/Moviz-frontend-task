import React, { useState, useEffect, useRef, useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext.js';
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
import {useHistory} from 'react-router-dom';

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';


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


function formatDate(date) {
    var d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    let parse = [year, month, day].join('-');
    console.log(parse)
    return parse
}

const Register = () => {
    const classes = useStyles();
    const history = useHistory();

    const { name, changeName, deleteName } = useContext(GlobalContext);
    const [values, setValues] = React.useState({
        name: '',
        password: '',
        email: '',
      });
      const state = useContext(GlobalContext);
    

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    
    const handleDateChange = (date) => {
        setValues({ ...values, date_of_birth: date });
    };

    const submitForm = (event) => {
        // Make Request Here
        let data = {
            name: values.name,
            email: values.email,
            password: values.password,
        };

        axios.post(state.url + 'auth/register/', data)
        .then(res => {
            history.push("/login");
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    return (    
        <>
            <Card
                style={{
                    maxWidth: "600px",
                    margin: "auto"
                }}
            >
                
                <Typography variant="h4" gutterBottom style={{textAlign: "center"}}>
                    Register
                </Typography>

                <Divider />
                
                <div
                    style={{width: "100%", padding: "20px"}}
                >
                    <FormControl  fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-username"
                        value={values.name}
                        onChange={handleChange('name')}
                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                        labelWidth={60}
                        type="text"
                    />
                    </FormControl>

                    <div style={{padding: "10px"}} />

                    <FormControl  fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-email"
                        value={values.email}
                        onChange={handleChange('email')}
                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                        labelWidth={60}
                        type="email"
                    />
                    </FormControl>

                    <div style={{padding: "10px"}} />

                    <FormControl  fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        value={values.password}
                        onChange={handleChange('password')}
                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                        labelWidth={60}
                        type="password"
                    />
                    </FormControl>

                    <div style={{padding: "10px"}} />

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

                        onClick={ () => submitForm() } 
                    >
                        Register
                    </Button>
                </div>

            </Card>  
        </>
    )
}


export default Register;