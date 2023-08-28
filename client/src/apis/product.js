import axios from '../axios';

export const apiGetProducts = (params) => axios({
    url: '/product/',
    method : 'get',
    params
})

export const apiGetProduct = (pid) => axios({
    url: '/product/' + pid,
    method : 'get',
    
})