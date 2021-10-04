import { Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard.jsx'
import { useSelector } from 'react-redux'
import api from '../../api'

export default function Products(){
    // const item = useSelector((state) => state.ecommerce.products)
    const [products, setProducts] = useState([])

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
                <Grid container spacing={4}>
                {products.map((product) => 
                    <Grid key={product.id} xs={3}>
                        <ProductCard item={product}/>
                    </Grid>)} 
                </Grid>
    )
}