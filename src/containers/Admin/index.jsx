import { Grid, Tooltip } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';
import api from '../../api';
import AdminCard from '../../components/AdminCard';
import AddBoxIcon from '@material-ui/icons/AddBox';

export default function Admin() {
    
    const users = useSelector((state)  => state.ecommerce.username)
    const [products, setProducts] = useState([])
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')

    const handleCreate = (e) => {
        e.preventDefault()
        api.post('/products', {
            name, 
            description,
            price,
            image,
        })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        api.get('/products')
        .then(response => {
            setProducts(response.data)
        })
        .catch(function(err) {
            console.log(err);
        })
    }, [])


    return (
        <>
        <Tooltip title='Create Item'>
        <AddBoxIcon onClick={handleShow} style={{marginBottom: '2rem', cursor: 'pointer', color: '#707070'}} />
        </Tooltip>
        <Modal style={{paddingTop: '10rem'}} show={show} onHide={handleClose}>
                        <Modal.Header>
                        <Modal.Title>Create Item</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleCreate}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control onChange={(e) => setName(e.target.value)} placeholder="Your Item" type="text" name="title"/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control onChange={(e) => setDescription(e.target.value)} placeholder="Details" type="text" name="desc"/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control onChange={(e) => setPrice(e.target.value)} placeholder="Item Price" type="text" name="price"/>
                                </Form.Group>
                                <Form.Group className="mb-5">
                                    <Form.Label>Image URL</Form.Label>
                                    <Form.Control onChange={(e) => setImage(e.target.value)} placeholder="https://images...." type="text" name="image"/>
                                </Form.Group>
                                <Button onClick={() => handleClose()} variant="primary" type="submit" value="Submit">
                                    Create
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>

            <Grid container spacing={4}>
                {products.map((adminStuff) => {
                    if(adminStuff.createdBy === users){
                        return (
                        <Grid key={adminStuff._id} xs={3}>
                            <AdminCard admin={adminStuff} />
                        </Grid>)
                        }
                    }
                )
                }
            </Grid>
        </>
    )
}