const initialState = {
    isLoggedIn: false,
    username: '',
    email: '',
    products: [],
    carts: [],
}

export const actionSwitch = {
    ADD_ITEM: 'ADD_ITEM',
    CREATE_ITEM: 'CREATE_ITEM',
    EDIT_ITEM: 'EDIT_ITEM',
    USER_LOGIN: 'USER_LOGIN',
    USER_LOGOUT: 'USER_LOGOUT',
    SAVE_ITEM: 'SAVE_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    REMOVE_ITEM_CART: 'REMOVE_ITEM_CART',
    CLEAR_ITEM: 'CLEAR_ITEM'
}

export default function reducer(state = initialState, action){
    switch(action.type) {
        case actionSwitch.USER_LOGIN: {
            return {
                ...state,
                isLoggedIn: true,
                username: action.data.username,
                email: action.data.email,
            }
        }
        case actionSwitch.USER_LOGOUT: {
            localStorage.clear()
            return {
                ...state,
                isLoggedIn: false,
                username: '',
                email: '',
            }
        }
        case actionSwitch.CREATE_ITEM: {
            return {
                ...state,
                products: [...state.products, action.data]
            }
        }
        case actionSwitch.ADD_ITEM: {
            return {
                ...state,
                products: [...state.products, action.data],
                carts: [...state.carts,action.data]
            }
        }
        case actionSwitch.EDIT_ITEM: {
            return {
                ...state,
                products: state.products.map((items) => {
                    if(items._id === action.data.id){
                        return {
                            ...items,
                            name: action.data.name,
                            createdBy: action.data.creator,
                            description: action.data.description,
                            price: action.data.price,
                        }
                    }
                })
            }
        }
        case actionSwitch.SAVE_ITEM: {
            return {
                ...state,
                carts: [...state.carts, action.data]
            }
        }
        case actionSwitch.REMOVE_ITEM_CART: {
            return {
                ...state,
                carts: state.carts.filter((items) => items._id !== action.data)
            }
        }
        case actionSwitch.REMOVE_ITEM: {
            return {
                ...state,
                carts: state.carts.filter((items) => items._id !== action.data),
                products: state.products.filter((items) => items._id !== action.data)
            }
        }
        case actionSwitch.CLEAR_ITEM: {
            return {
                ...state,
                products: [state.backlog, action.data]
            }
        }
        default:
            return state;
    }
}