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

export const apiRatings = (data) => axios({
    url: '/product/ratings',
    method : 'put',
    data
    
})

export const apiCreateProduct = (data) => axios({
    url: '/product/',
    method : 'post',
    data
    
})