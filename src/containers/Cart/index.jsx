import { Grid } from '@material-ui/core';
import React from 'react'
import CartCard from '../../components/CartCard';
import { useSelector } from 'react-redux';

export default function Cart() {
    const savedItems = useSelector((state) => state.ecommerce.carts)
    return (
                <Grid container spacing={4}>
                {savedItems.map((saved) => 
                        <Grid key={saved._id} savedItems xs={3}>
                            <CartCard cart={saved}/>
                        </Grid>)}
                </Grid>
    )
}
