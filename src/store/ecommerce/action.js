import { actionSwitch } from './reducer'
import api from '../../api'
import handleError from '../../errors'

export const login = (username, password) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await api.post('/login', {
                    username,
                    password
                })
                console.log('data dari action', data)

                localStorage.setItem('token', data.token)
                dispatch({
                    type: actionSwitch.USER_LOGIN,
                    data: { 
                        username: data.username, 
                        email: data.email 
                    },
                })
                resolve()
            } catch (error) {
                // console.log(JSON.stringify(error.response.data.error_message));
                handleError(error)
                reject(error)
            }
        })
    }
}

export const googleLogin = (username, email) => {
    return {
        type: actionSwitch.USER_LOGIN,
        data: { username, email }
    }
}

export const loginToken = () => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await api.post('/login/token', {}, {
                    headers: {
                        token: localStorage.getItem('token'),
                    }
                })
                // console.log('data', data);

                localStorage.setItem('token', data.token)
                dispatch({
                    type: actionSwitch.USER_LOGIN,
                    data: { username: data.user.username, email: data.user.email },
                })
                resolve()
            } catch (error) {
                // console.log(JSON.stringify(error.response.data.error_message));
                handleError(error)
                reject(error)
            }
        })
    }
}

export const logout = () => {
    return {
        type: actionSwitch.USER_LOGOUT,
    }
}

export const addItem = () => {
    return {
        type: actionSwitch.ADD_ITEM,
    }
}

// export const createItem = (name, description, price, image) => {
//     return (dispatch) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const { data } = await api.post('/products', {
//                 name,
//                 description,
//                 price,
//                 image,
//             })
//             console.log(data, 'hello');
//             dispatch({
//                 type: actionSwitch.CREATE_ITEM,
//                 data: {
//                     name: data.name,
//                     description: data.description,
//                     price: data.price,
//                     image: data.image,
//                 }
//             })
//             resolve()
//         } catch(error){
//             handleError(error)
//             reject(error)
//         }
//     })}
// }

export const createItem = (name, description, price, image) => {
    return {
        type: actionSwitch.CREATE_ITEM,
        data: name,
              description,
              price,
              image,
    }
}

export const editItem = (id, creator, description, name, price) => {
    return {
        type: actionSwitch.EDIT_ITEM,
        data: id,
              creator,
              description,
              name,
              price,
    }
}

export const removeItem = (removeItemId) => {
    return {
        type: actionSwitch.REMOVE_ITEM,
        data: removeItemId
    }
}

// export const removeItem = async (itemId) => {
//     const { data } = await api.delete(`/products/${itemId}`)
//     return data;
// }

export const removeItemCart = (removeCartItems) => {
    return {
        type: actionSwitch.REMOVE_ITEM_CART,
        data: removeCartItems,
    }
}

export const addToCart = (cart_id) => {
    return {
        type: actionSwitch.SAVE_ITEM,
        data: cart_id
    }
}

export const clearItem = () => {
    return {
        type: actionSwitch.CLEAR_ITEM,
    }
}