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


async function getApi(url, data) {
    let res = await axios.post(url + 'auth/login/', data)
    res = res.data;
    localStorage.setItem("access_token", res.access_token);
    console.log(res);

}
const Login = () => {
    const classes = useStyles();
    const state = useContext(GlobalContext);
    const [values, setValues] = React.useState({
        email: '',
        password: '',
    });

    const history = useHistory();
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const submitForm = () => {
        try {
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

    return (
        <>
            <Card
                style={{
                    maxWidth: "600px",
                    margin: "auto"
                }}
            >

                <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
                    Login
                </Typography>

                <Divider />

                <div
                    style={{ width: "100%", padding: "20px" }}
                >
                    <FormControl fullWidth variant="outlined">
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

                    <div style={{ padding: "20px" }} />

                    <FormControl fullWidth variant="outlined">
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
                        Login
                    </Button>
                </div>

            </Card>
        </>
    )
}


export default Login;