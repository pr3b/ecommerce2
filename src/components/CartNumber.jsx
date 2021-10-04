import React from 'react'
import { useSelector } from 'react-redux'

function CartNumber() {
    
    const notification = useSelector((state) => state.ecommerce.carts)
    const itemNumber = parseInt(notification.length)
    // console.log(itemNumber);

    return (
        <>
            {itemNumber}
        </>
    )
}

export default CartNumber
