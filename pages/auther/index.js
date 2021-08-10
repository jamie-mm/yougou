import request from "../../utils/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  handleGetUserInfo(msg){
    // console.log(msg)
    wx.login({
      success (res) {
        if (res.code) {
           // 拼接参数
          const data={
            code:res.code,
            encryptedData: msg.detail.encryptedData,
            rawData: msg.detail.rawData,
            iv: msg.detail.iv,
            signature: msg.detail.signature,
          }
          // console.log(res.code)
          request({
            url:'https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin',
            data,
            method: "POST"
          }).then(res=>{
            // console.log(res)
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }

})