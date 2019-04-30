let Mock = require('mockjs');

export default  Mock.mock({
    'shopList': [
        {
            shopId:0,
            key:0,
            shopImg: Mock.Random.image('200x200', Mock.Random.color(), Mock.Random.color(), 'png', Mock.Random.first()),
            shopName: Mock.Random.ctitle(2,6),
            shopPrice: Mock.Random.natural(0, 1000),
        },
        {
            shopId:1,
            key:1,
            shopImg: Mock.Random.image('200x200', Mock.Random.color(), Mock.Random.color(), 'png', Mock.Random.first()),
            shopName: Mock.Random.ctitle(2,6),
            shopPrice: Mock.Random.natural(0, 1000),
        },
        {
            shopId:2,
            key:2,
            shopImg: Mock.Random.image('200x200', Mock.Random.color(), Mock.Random.color(), 'png', Mock.Random.first()),
            shopName: Mock.Random.ctitle(2,6),
            shopPrice: Mock.Random.natural(0, 1000),
        },
        {
            shopId:3,
            key:3,
            shopImg: Mock.Random.image('200x200', Mock.Random.color(), Mock.Random.color(), 'png', Mock.Random.first()),
            shopName: Mock.Random.ctitle(2,6),
            shopPrice: Mock.Random.natural(0, 1000),
        },
        {
            shopId:4,
            key:4,
            shopImg: Mock.Random.image('200x200', Mock.Random.color(), Mock.Random.color(), 'png', Mock.Random.first()),
            shopName: Mock.Random.ctitle(2,6),
            shopPrice: Mock.Random.natural(0, 1000),
        },
        {
            shopId:5,
            key:5,
            shopImg: "http://t00img.yangkeduo.com/goods/images/2019-03-15/0552a9079b446fe64de5d864ef7b025b.jpeg",
            shopName: "樱花冰箱60/102/122/142/152升双门三门家用小型冷冻冷藏节能静音",
            shopPrice:999,
        },
        {
            shopId:6,
            key:6,
            shopImg: "http://t00img.yangkeduo.com/goods/images/2019-03-22/fb8aea91dfe1e83806e7bee51de0bafb.jpeg",
            shopName:  "实木茶桌椅组合仿古功夫茶桌 1.5米中式古典茶几桌泡茶台",
            shopPrice:785,
        },
        {
            shopId:7,
            key:7,
            shopImg:"http://t00img.yangkeduo.com/goods/images/2018-10-08/a54d97cb83fd492f83642e09c091f97a.jpeg",
            shopName: "香朵儿金丝绒套装女2018冬季新款卫衣加绒加厚马甲休闲运动三件套",
            shopPrice:234,
        },
        {
            shopId:8,
            key:8,
            shopImg: "http://t00img.yangkeduo.com/goods/images/2019-01-02/50622c4e7d22bbfa8f9adba06e72d35f.jpeg",
            shopName:"妠芷80-170斤 95%棉大码春长袖T恤女宽松新款休闲上衣女打底衫女",
            shopPrice:59,
        },
        {
            shopId:9,
            key:9,
            shopImg: "http://t00img.yangkeduo.com/goods/images/2018-09-06/df5511bacf05bdca24395ca5bd46673f.jpeg",
            shopName:  "【五香泥腌】咸鸭蛋熟30枚10枚赛高邮咸鸭蛋正宗红心流油非海鸭蛋",
            shopPrice:99,
        },
        {
            shopId:10,
            key:10,
            shopImg: "http://t00img.yangkeduo.com/goods/images/2018-12-19/cc89aaf9b90b352745699214990f1a8a.jpeg",
            shopName:  "【单棉可选】【花花公子贵宾正品】春季男女同款加绒休闲运动棉鞋",
            shopPrice:239,
        }
    ]
}).shopList;






