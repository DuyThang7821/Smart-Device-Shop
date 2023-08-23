import axios from '../axios';

export const apiGetProducts = (params) => axios({
    url: '/product/',
    method : 'get',
    params
})