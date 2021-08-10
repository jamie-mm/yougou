// import request from '../../utils/request'
import {request} from '../../request/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navs:[],
        current:0
    },
    Cates:[],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const cates=wx.getStorageSync('cates')
        if(!cates){
            this.getcate()
        }
         this.getcate()
    },
    handlemain(event){
            // console.log(index)
            const {index}=event.currentTarget.dataset
            this.setData({
                current:index
            })
    },
    getcate(){
        request({
            url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"
        }).then(res=>{
            // console.log(res)
            const {message}=res.data
            wx.setStorageSync('cates',{time:Date.now(),data:this.message})
            this.setData({
                navs:message
            })
        })
    }

    
})