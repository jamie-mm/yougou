import {request} from '../../request/index'
Page({
    /**
     * 页面的初始数据
     */
    data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 5000,
    },
// 详情页面数据
    defule:{

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    // console.log(options)
    const {id}=options
            request({
                url:'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',
                data:{
                    goods_id:id
                }
            }).then(res=>{
                // console.log(res)
                const {message}=res.data
                this.setData({
                    defule:message
                })
            })
    },
    // 点击添加到购物车
    handaddgods(){
            wx.showToast({
              title: '添加购物车成功',
              icon:'success',
              duration:2000
            })
        // console.log(1111)
        // 获取本地的goods列表
           const goods= wx.getStorageSync("goods") || {};
           const {defule}=this.data
        // 添加默认的选择状态和数量
        defule.select=true;
        defule.number=1
           goods[defule.goods_id]=defule
        // 保存到本地
           wx.setStorageSync('goods', goods)
    }
   
})