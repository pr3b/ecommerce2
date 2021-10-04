import React, { useState } from 'react'
import { Card, CardMedia, Tooltip, CardContent, makeStyles, IconButton, Typography } from '@material-ui/core'
import { MdStore, MdDelete } from 'react-icons/md'
import { Button, Modal, Form } from 'react-bootstrap';
import Spacer from './Spacer';
import { useDispatch } from 'react-redux';
import { editItem, removeItem } from '../store/ecommerce/action';
import EditIcon from '@material-ui/icons/Edit'
import Swal from 'sweetalert2';
import handleError from '../errors'
import api from '../api';

const useStyles = makeStyles({
    root: {
      maxWidth: 250,
    },
    media: {
      height: 200,
    },
  });

const nf = Intl.NumberFormat('id', { 
    currency: 'IDR', 
    style: 'currency', 
    maximumFractionDigits: 0
})

const HAlign = (props) => <span style={{
    display: 'flex', 
    alignItems: 'center'
}} {...props} />


export default function AdminCard({admin}) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const itemId = admin._id

    // const handleDelete = (itemId) => {
    //     dispatch(removeItem(itemId))
    // }

    const handleDelete = () => {
        api.delete(`/products/${admin._id}`)
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            handleError(err)
        })
    }
    
    function noticeButton(){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to undo this action!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed && handleDelete(admin._id)) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    }

    const handleEdit = (e) => {
        e.preventDefault()
        const itemsId = admin._id
        const creator = admin.createdBy
        if(itemsId && creator){
            dispatch(editItem({
                id: itemsId,
                createdBy: creator,
                name: e.target[0].value,
                description: e.target[1].value,
                price: e.target[2].value,
            }))
        }
    } 

    
    return (
        <>
            <Card className={classes.root} >
                <CardMedia className={classes.media} image={admin.image} title={admin.name} />
                <CardContent>
                    <Typography variant="h6">
                        {admin.name}
                    </Typography>
                    <Typography variant="body2">
                        {admin.description}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                    <HAlign>
                        <MdStore />
                        {` ${admin.createdBy} store`}
                    </HAlign>
                    </Typography>
                    <HAlign>
                    <Typography variant="body1" color="secondary">
                        {nf.format(admin.price)}
                    </Typography>
                    <Spacer />
                    <Tooltip title='Edit this Item'>
                    <EditIcon onClick={handleShow} style={{cursor: 'pointer', color: '#707070'}} />
                    </Tooltip>
                    <Modal style={{paddingTop: '10rem'}} show={show} onHide={handleClose}>
                        <Modal.Header>
                        <Modal.Title>Edit Item</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleEdit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control onChange={(e) => setName(e.target.value)} placeholder={admin.name} type="text" name="title"/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control onChange={(e) => setDescription(e.target.value)} placeholder={admin.description} type="text" name="desc"/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control onChange={(e) => setPrice(e.target.value)} placeholder={admin.price} type="text" name="price"/>
                                </Form.Group>
                                <Form.Group className="mb-5">
                                    <Form.Label>ImageURL</Form.Label>
                                    <Form.Control onChange={(e) => setImage(e.target.value)} placeholder={admin.image} type="text" name="iamge"/>
                                </Form.Group>
                                <Button onClick={() => handleClose()} variant="primary" type="submit" value="Submit">
                                    Edit Item
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                    <Tooltip title='Remove from Admin'>
                    <IconButton onClick={() => noticeButton()}>
                        <MdDelete />
                    </IconButton>
                    </Tooltip>
                    </HAlign>
                </CardContent>
            </Card>
        </>
    )  
}