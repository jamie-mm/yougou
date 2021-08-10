import {request} from '../../request/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
            // 定义一个取消
            inputvalue:"",
            history:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 页面一加载就获取本地存储数据
        const history = wx.getStorageSync('history') || [];
        this.setData({
            history:history
        })
    },
    handleInput(event){
// console.log(event)
    const {value}=event.detail
    this.setData({
        inputvalue:value
    });
 
    },
    // 点击取消按钮清除value
    handleclear(){
        this.setData({
            inputvalue:''
        })
    },
    // 搜索点击完成或者确定按钮时触发
    bindconfirm(){
        // 点击完成或者确定跳转到搜索列表
        wx.navigateTo({
                url:'/pages/goods_list/index?keyword='+this.data.inputvalue
        });
        // 保存新的搜索关键字之前，要把旧的关键字添加到已有列表
        const arr=[this.data.inputvalue,...this.data.history]
        this.setData({
            history:[...new Set(arr)]  //数组去重
        })
    // 设置本地存储
        wx.setStorageSync('history', this.data.history)
    },
        // 点击清除所有历史记录
    clearhandle(){
        wx.removeStorageSync('history')
        this.setData({
            history:[]
        })
    }

})