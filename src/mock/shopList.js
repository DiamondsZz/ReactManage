let Mock = require('mockjs');

export default  Mock.mock({
    'shopList': [
        {
            shopId:0,
            key:0,
            shopImg: Mock.Random.image('200x200', Mock.Random.color(), Mock.Random.color(), 'png', Mock.Random.first()),
            shopName: Mock.Random.ctitle(2,6),
            shopPrice: Mock.Random.natural(0, 10000),
        },
        {
            shopId:1,
            key:1,
            shopImg: Mock.Random.image('200x200', Mock.Random.color(), Mock.Random.color(), 'png', Mock.Random.first()),
            shopName: Mock.Random.ctitle(2,6),
            shopPrice: Mock.Random.natural(0, 10000),
        },
        {
            shopId:2,
            key:2,
            shopImg: Mock.Random.image('200x200', Mock.Random.color(), Mock.Random.color(), 'png', Mock.Random.first()),
            shopName: Mock.Random.ctitle(2,6),
            shopPrice: Mock.Random.natural(0, 10000),
        },
        {
            shopId:3,
            key:3,
            shopImg: Mock.Random.image('200x200', Mock.Random.color(), Mock.Random.color(), 'png', Mock.Random.first()),
            shopName: Mock.Random.ctitle(2,6),
            shopPrice: Mock.Random.natural(0, 10000),
        },
        {
            shopId:4,
            key:4,
            shopImg: Mock.Random.image('200x200', Mock.Random.color(), Mock.Random.color(), 'png', Mock.Random.first()),
            shopName: Mock.Random.ctitle(2,6),
            shopPrice: Mock.Random.natural(0, 10000),
        }
    ]
}).shopList;






