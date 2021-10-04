import { Paper, TextField, Button, withStyles, Typography, makeStyles, Link, Grid, Tooltip } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginToken, googleLogin, login } from '../../store/ecommerce/action'
import { Modal, Form } from 'react-bootstrap';
import api from '../../api';
import Swal from 'sweetalert2';
import handleError from '../../errors'

export default function Login() {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')

    const handleCreateUser = (e) => {
        e.preventDefault()
        api.post('/register', {
            username,
            password,
            email,
        })
        .then(response => {
            noticeButton()
            console.log(response);
        })
        .catch(err => {
            handleError(err)
            console.log(err);
        })
    }

    function noticeButton(){
        Swal.fire(
            'User Added!',
            'Welcome to the Club!',
            'success'
          )
    }

    return (
        <>
                    {/* <Tooltip title='Create Item'> */}
                    <Button onClick={handleShow} style={{fontSize: '0.7rem', cursor: 'pointer', color: '#707070'}}>Register</Button>
                    {/* </Tooltip> */}
                    <Modal style={{paddingTop: '10rem'}} show={show} onHide={handleClose}>
                        <Modal.Header>
                        <Modal.Title>Register</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleCreateUser}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control onChange={(e) => setUsername(e.target.value)} placeholder="name" type="name" name="name"/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={(e) => setPassword(e.target.value)} placeholder="password123" type="password" name="password"/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control onChange={(e) => setEmail(e.target.value)} placeholder="name@mail.com" type="email" name="email"/>
                                </Form.Group>
                                <Button onClick={() => handleClose()} variant="primary" type="submit" value="Submit">
                                    Create
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
        </>
    )
}
