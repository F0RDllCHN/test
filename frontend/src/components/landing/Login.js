import React, { useState } from "react"
import { Box, Button, Link } from '@material-ui/core'
import TextFieldSmall from '../TextFieldSmall'
import { useHistory } from "react-router-dom";
import axios from 'axios'

export default function Login(props) {

    const history = useHistory()
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    })

    const handleChangeLogin = (key) => (event) => {
        setLoginData({
            ...loginData,
            [key]: event.target.value,
        })
        
    }

    const handleLogin = async () => {
        // not connect to db, just allow any username&password
        localStorage.setItem('username', loginData.username)
        localStorage.setItem('auth', true)
        history.push("/courses")
        window.location.reload();
        // axios.post("/login", {
        //         username: loginData.username,
        //         password: loginData.password
        //     },{
        //         params: {
        //             username: loginData.username
        //         }
        //     }).then(response => {
        //         console.log(response.data.result)
        //         const result = response.data.result
        //         if (result) {
        //             localStorage.setItem('username', loginData.username)
        //             localStorage.setItem('auth', true)
        //         } else {
        //             localStorage.setItem('username', '')
        //             localStorage.setItem('auth', false)
        //         }
        //     }).catch(err => {
        //         console.error(err)
        //     })
    }

    return (
        <Box display="flex" flexDirection="column">
            <TextFieldSmall
                display='Username'
                value={loginData['username']}
                onChange={handleChangeLogin('username')}
            />
            <TextFieldSmall
                style={{marginBottom: 4}}
                display='Password'
                type='password'
                value={loginData['password']}
                onChange={handleChangeLogin('password')}
            />
            <Link
                style={{marginBottom: 16}}
                align="right"
                component="button"
                variant="body2"
                onClick={() => {props.setState(3)}}
            >
                Forgot Password?
            </Link>
            <Button
                variant="outlined"
                color="primary"
                style={{marginBottom: 16}}
                onClick={() => {handleLogin()}}
            >
                Login
            </Button>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => {props.setState(1)}}
            >
                Register
            </Button>
        </Box>
    )
}