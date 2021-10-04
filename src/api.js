import axios from 'axios'

export default axios.create({
    baseURL: `https://auth-example1.herokuapp.com`,
    headers: {
        token: localStorage.getItem('token'),
    }
})
