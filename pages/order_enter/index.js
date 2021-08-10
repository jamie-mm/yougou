import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      address:{},
      goods:[],
      allprice:0
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 或者本地存储地址信息
     const address= wx.getStorageSync('address')
    //  获取本地存储选择商品数据
   const goods= wx.getStorageSync('select_goods')
  //  计算总价格
  let price=0;
  goods.forEach(v => {
    price +=v.goods_price *   v.number
  });
     this.setData({
       address,
       goods,
       allprice:price
     })
  },
  // 支付
  handlePay(){
    
    const {allPrice,goods,address}=this.data

    const newGoods=goods.map(v=>{
      return{
        goods_id:v.goods_id,
        goods_number:v.number,
        goods_price:v.goods_price
      }
    })

    request({
      url:'https://api-hmugo-web.itheima.net/api/public/v1/my/orders/create',
      method: "POST",
      data:{
        order_price: allPrice, //总价格
        consignee_addr: `${address.userName} ${address.telNumber} ${address.detailInfo}`, // 收货地址
        goods: newGoods // 筛选过来的商品数据
      }
    }).then(res=>{

    });
    wx.navigateTo({
      url: '/pages/auther/index',
    })



  }
  

})



