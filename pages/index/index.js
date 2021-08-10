// import request from '../../utils/request'
import {request} from '../../request/index'
Page({
  data:{
    // 轮播
    background:[],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 5000,
    // 分类
    menus:[],
    // 楼层
    floors:[]
  },

  onLoad(){
    // 轮播图
    this.getswiperList() 
    // 分类
   this.getcateList()
    // 楼层
   this.getfoolerList()
  },

  // 获取轮播图数据    封装方法
  getswiperList(){
     // 轮播图
    // request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    // }).then(res=>{
    //   // console.log(res)
    //   const {message}=res.data
    //   this.setData({
    //     background:message
    //   })
    // });
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata' 
    }).then(res=>{
      const {message}=res.data
      this.setData({
        background:message
      })
    })
  },
  // 或者分类列表
  getcateList(){
    request({
      url:'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'
    }).then(res=>{
      // console.log(res)
      const {message}=res.data
      this.setData({
        menus:message
      })
    });
  },
  // 获取楼层数据
  getfoolerList(){
    request({
      url:'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata'
    }).then(res=>{
      // console.log(res)
      const {message}=res.data
      this.setData({
        floors:message
      })
    })
  }
  
})
