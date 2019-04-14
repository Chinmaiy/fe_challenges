import axios from 'axios';
import { unsplashAccessKey } from '../app.secrets';

//create an instance of axios client with some defaulted properties 
export const unsplash = axios.create(
    {
        baseURL: 'https://api.unsplash.com',
        headers: {
            Authorization: `Client-ID ${unsplashAccessKey}`
        }
    }
);

export const searchPhotosUrl = '/search/photos';