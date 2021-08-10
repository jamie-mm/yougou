import {request} from '../../request/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
            current:0,
            // 商品列表
            goods:[],
            // 关键字
            keyword:'',
            // 页码
            pagenum:1,
            // 页数
            pagesize:10,
            //定义一个变量来判断一下是否有下一页数据默认为有
            mosehad:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options)
        // 假设关键字
            // let keyword='小米'
            this.setData({
                keyword:options.keyword
            })
            // 获取列表数据
        this.getDate()
    },
    // tab
    handtab(event){
        // console.log(event)
        const {index}=event.currentTarget.dataset
        this.setData({
            current:index
        })   
    },
    // 封装方法
    getDate(){
        const {keyword,pagenum,pagesize}=this.data
        request({
            url:'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
            data:{
                // 写法一
                // query:this.data.keyword,
                // pagenum:this.data.pagenum,
                // pagesize:this.data.pagesize
                // 写法二
                query:keyword,
                pagenum,
                pagesize
            }             
          }).then(res=>{
            // console.log(res)
            const {goods}=res.data.message
            if(goods.length<this.data.pagesize){
               this.setData({
                mosehad:false
               })
            }
           const newgoods= goods.map(v=>{
                v.goods_price=Number(v.goods_price).toFixed(2)
                return v
            })
            this.setData({
                // 不应该覆盖
                // goods:newgoods
                // 应该追加
                goods:[...this.data.goods,...newgoods]              
            })
          })
    },
    // 加载下一页数据
        onReachBottom(){
            if(!this.data.mosehad){
                return
            }
            this.setData({
                pagenum:this.data.pagenum+1
            })
            // 获取列表数据
            this.getDate()
           
        }
})