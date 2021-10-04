import React from 'react'
import { AppBar, Toolbar, Typography, Link, Badge, Menu, MenuItem } from '@material-ui/core'
import Spacer from '../../components/Spacer'
import { Link as RouterLink, Route, Router, Redirect, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import CartNumber from '../../components/CartNumber'
import { Container } from 'react-bootstrap'
import Products from '../Products'
import Admin from '../Admin'
import Cart from '../Cart'
import { logout } from '../../store/ecommerce/action'
import { useDispatch } from 'react-redux'

const CustomLink = (props) => <Link component="button" {...props} style={{color: "white", marginLeft: 48}} />

export default function MainApp() {

  const dispatch = useDispatch()
  const history = createBrowserHistory()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };
  const handleCloseTwo = () => {
      setAnchorEl(null);
  };

  const userLogout = () => {
    dispatch(logout())
  }

    return (
        <>
        <Router history={history}>
            <AppBar position="sticky" style={{marginBottom: 24}}>
            <Toolbar>
              <Typography variant="h6" style={{textDecoration: 'none', color: 'white'}} component={RouterLink} to='/products'> 
                E-Commerce
              </Typography>
              <Spacer />
              
                {/* <CustomLink
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                >Admin</CustomLink>
                <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseTwo}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                >
                    <MenuItem onClick={handleCloseTwo}>Add Item</MenuItem>
                    <MenuItem to='/admin' component={RouterLink} onClick={handleCloseTwo}>Admin</MenuItem>
                </Menu> */}

                <CustomLink to='/admin' component={RouterLink}>Admin</CustomLink>
                <CustomLink to='/products' component={RouterLink}>Products</CustomLink>
                <CustomLink to='/cart' component={RouterLink}>
                  <Badge color="secondary" badgeContent={<CartNumber />}>
                    Cart
                  </Badge>
                </CustomLink>
                <CustomLink to='/login' component={RouterLink} onClick={userLogout}>Logout</CustomLink>
            </Toolbar>
          </AppBar>
          <Container>
              <Route path='/' exact component={(props) => <Redirect {...props} to='/products'/>}/>
              <Route path='/products' exact component={Products} />
              <Route path='/admin' exact component={Admin} />
              <Route path='/cart' exact component={Cart} />
          </Container>
        </Router>
        </>
    )
}
