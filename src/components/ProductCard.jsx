import React from 'react'
import { Card, CardMedia, Tooltip, CardContent, Typography, makeStyles, IconButton } from '@material-ui/core'
import { MdStore, MdAddShoppingCart } from 'react-icons/md'
import Spacer from './Spacer';
import { addToCart } from '../store/ecommerce/action';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'


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



export default function ProductCard({item}) {

    function noticeButton(){
        Swal.fire(
            'Item Added!',
            'In your Cart',
            'success'
          )
    }

    const dispatch = useDispatch()

    function goToCart(toCart){
        dispatch(addToCart(toCart))
    }

    const classes = useStyles()

    return (
        <Card className={classes.root}>
                <CardMedia className={classes.media} image={item.image} title={item.name} />
                <CardContent>
                    <Typography variant="h6">
                        {item.name}
                    </Typography>
                    <Typography variant="body2">
                        {item.description}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                    <HAlign>
                        <MdStore />
                        {` ${item.createdBy} store`}
                    </HAlign>
                    </Typography>
                    <HAlign>
                    <Typography variant="body1" color="secondary">
                        {nf.format(item.price)}
                    </Typography>
                    <Spacer />
                    <Tooltip title='Add to Cart'>
                    <IconButton onClick={() => noticeButton(goToCart(item))}>
                        <MdAddShoppingCart />
                    </IconButton>
                    </Tooltip>
                    </HAlign>
                </CardContent>
        </Card>
    )
}
