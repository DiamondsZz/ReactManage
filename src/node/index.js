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

