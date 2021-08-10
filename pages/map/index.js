var QQMapWX = require('../../utils/qqmap-wx-jssdk.min');
var qqmapsdk;
Page({

    /**
     * 页面的初始数据
     */
    data: {  
     keyword:'',
     showCompass:true,
     showscale:true
    },
    // 搜索周边
    handleseacher(event){
        // console.log(event)
        const {value}=event.detail
        this.setData({
            keyword:value
        })
    },

    onLoad: function () {
        // 实例化API核心类
        qqmapsdk = new QQMapWX({
            key: 'FMVBZ-RKAKW-CLRRQ-OG36M-D7SWF-DVBCA'
        });
    },

    onShow: function () {
        // 调用接口
    //     qqmapsdk.search({
    //         keyword: '酒店',
    //     complete: function (res) {
    //         console.log(res);
    //     }
    //  });
  },

  // 事件触发，调用接口
nearby_search:function(){
    var _this = this;
    // 调用接口
    qqmapsdk.search({
       keyword: _this.data.keyword,  //搜索关键词
       longitude:113.2759952545166,
        latitude:23.117055306224895,
       location: '23.117055306224895,113.2759952545166',  //设置周边搜索中心点
       success: function (res) { //搜索成功后的回调
         var mks = []
         for (var i = 0; i < res.data.length; i++) {
           mks.push({ // 获取返回结果，放到mks数组中
             title: res.data[i].title,
             id: res.data[i].id,
             latitude: res.data[i].location.lat,
             longitude: res.data[i].location.lng,
             iconPath: "../../images/icon_show_active@3x.png", //图标路径
             width: 20,
             height: 20
           })
         }
         _this.setData({ //设置markers属性，将搜索结果显示在地图中
           markers: mks
         })
       },
       
   });
 }

})