import Ajax from './Ajax'


const BASE_URL = 'http://127.0.0.1:3003';

//请求商品数据
export const getShopList =()=> Ajax(BASE_URL+'/manage/shop');

//修改商品
export const updateShop =(shop)=> {

    return Ajax(BASE_URL+'/manage/updateShop',{shop:shop},'POST');
}

//删除商品
export const deleteShop =(shop)=> Ajax(BASE_URL+'/manage/deleteShop',{shopId:shop.shopId});

//添加商品
export const addShop =(shop)=> {

    return Ajax(BASE_URL+'/manage/addShop',{shop:shop},'POST');
}

//请求用户数据
export const getUserList =()=> Ajax(BASE_URL+'/manage/user');

//用户登录
export const userLogin =(user)=> Ajax(BASE_URL+'/manage/userLogin',user,'POST');

