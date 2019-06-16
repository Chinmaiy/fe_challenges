import axios from 'axios';
import history from './history';

class Service {

    constructor() {
        let api = axios.create({
            baseURL: 'http://localhost:5000/api'
        });

        api.interceptors.response.use(this.onFulfilled, this.onRejected);
        this.api = api;
    }

    onFulfilled = (response) => {
        return response;
    }

    onRejected = (error) => {

        console.log(error);

        const status = error.response.status;

        if(status === 401) {
            history.push('/login'); //
        }

        return Promise.reject(error);
    }
}