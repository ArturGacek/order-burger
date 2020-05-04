import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-order-burger.firebaseio.com/'
});

export default instance;

