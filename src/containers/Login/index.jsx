import { Paper, TextField, Button, withStyles, Typography, makeStyles, Link, Grid, Tooltip } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import qs from 'querystring'
import { useLocation } from 'react-router-dom';
import { loginToken, googleLogin, login } from '../../store/ecommerce/action'
import { Modal, Form } from 'react-bootstrap';
import api from '../../api';
import Swal from 'sweetalert2';
import Register from '../Register'

const Centered = (props) => (
    <div {...props} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - (64px + 24px))'}}/>
);

const CustomPaper = withStyles({
    root: {
        height: 300, 
        width: 400,
        padding: 24, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'space-evenly',
    }
})(Paper)

const LoginContainer = (props) => (
    <div {...props} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} />
)

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '350px',
      },
    },
  }));

export default function Login() {
    const dispatch = useDispatch()
    const classes = useStyles()
    
    const isLoggedIn = useSelector((state) => state.ecommerce.isLoggedIn)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    // const [registerName, setRegisterName] = useState('')
    // const [registerPassword, setRegisterPassword] = useState('')
    // const [registerEmail, setRegisterEmail] = useState('')

    // const handleCreateUser = (e) => {
    //     e.preventDefault()
    //     api.post('/register', {
    //         username,
    //         password,
    //         email,
    //     })
    //     .then(response => {
    //         console.log(response);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(username, password))
    }

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const location = useLocation()

    useEffect(() => {
        if(location.search){
            const parsed = qs.parse(location.search.split('?')[1])
            console.log('parsed', parsed);
            const payload = JSON.parse(parsed.payload)
            if(payload) {
                localStorage.setItem('token', payload.token)
                dispatch(googleLogin(payload.username, payload.email))
            }
        }
    }, [location])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            dispatch(loginToken())
        }
    }, [])

    // function noticeButton(){
    //     Swal.fire(
    //         'User Added!',
    //         'Welcome to the Club!',
    //         'success'
    //       )
    // }

    return (
        isLoggedIn ? (<Redirect to="/" />)
        :
        (<Centered>
            <LoginContainer>
                <CustomPaper variant='outlined'>
                    <Typography variant='h6'>Login</Typography>
                    <form onSubmit={handleSubmit} className={classes.root}>
                        <TextField onChange={handleUsername} fullWidth variant='filled' label='username' />
                        <TextField onChange={handlePassword} fullWidth variant='filled' label='password' type='password' />
                        <Button fullWidth variant='contained' color='secondary' type='submit'>Login</Button>
                    </form>
                    <Link href='https://auth-example1.herokuapp.com/login/google'>Login with Google Sign In</Link>
                    <Register />
                </CustomPaper>
            </LoginContainer>
        </Centered>)
    )
}
