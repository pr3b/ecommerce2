import React from 'react'
import { Card, CardMedia, Tooltip, CardContent, Typography, makeStyles, IconButton } from '@material-ui/core'
import { MdStore, MdDelete } from 'react-icons/md'
import Spacer from './Spacer';
import { removeItemCart } from '../store/ecommerce/action';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';


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

const HAlign = (props) => <span style={{display: 'flex', alignItems: 'center'}} {...props} />

export default function CartCard({cart}) {
    const dispatch = useDispatch()
    const classes = useStyles()
    
    function noticeButton(){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed && deleteItems(cart._id)) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    }

    function deleteItems(delItem){
        dispatch(removeItemCart(delItem))
    }


    return (
        <Card className={classes.root} >
                <CardMedia className={classes.media} image={cart.image} title={cart.name} />
                <CardContent>
                    <Typography variant="h6">
                        {cart.name}
                    </Typography>
                    <Typography variant="body2">
                        {cart.description}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                    <HAlign>
                        <MdStore />
                        {` ${cart.createdBy} store`}
                    </HAlign>
                    </Typography>
                    <HAlign>
                    <Typography variant="body1" color="secondary">
                        {nf.format(cart.price)}
                    </Typography>
                    <Spacer />
                    <Tooltip title='Remove from Cart'>
                        <IconButton onClick={() => noticeButton()}>
                            <MdDelete />
                        </IconButton>
                    </Tooltip>
                    </HAlign>
                </CardContent>
        </Card>
    )
}
