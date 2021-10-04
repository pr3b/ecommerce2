import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'
import { loginToken } from '../store/ecommerce/action'

export default function ProtectedRoute({ path, component: Component, ...props }) {
    const isLoggedIn = useSelector((state) => state.ecommerce.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!isLoggedIn){
            const token = localStorage.getItem('token')
            if(token){
                dispatch(loginToken())
            }
        }
    }, [isLoggedIn]);

    return (
        <>
            <Route {...props} path={path} render={(props) => (
                isLoggedIn ? <Component {...props} /> : <Redirect to='/login' />
                )} />
        </>
    )
}
