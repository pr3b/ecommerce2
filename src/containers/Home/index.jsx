import React from 'react'
import { Redirect, Route } from 'react-router'
import MainApp from '../MainApp'

export default function Home() {
    return (
        <>
            <Redirect to='/mainapp' />
            <Route path='/mainapp' component={MainApp} />
        </>
    )
}
