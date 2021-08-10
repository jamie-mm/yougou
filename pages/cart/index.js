Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货人的信息
    address:{
      userName:'',
      telNumber:'',
      detailInfo:''
    },
    // goods是来自于本地的购物车数据列表
    goods: {},
    // 总价格
    allprice:0,
    // 定义一个全选状态
    allselect:true,
    // 判断购物车是否为空
    isEmpty:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow(){
   this.handlechangde()
  //  每次打开页面的时候都要初始化isEmpty状态
   this.setData({
     isEmpty:false
   })
  //  判断对象是否为空
      if(Object.keys(this.data.goods).length===0){
          this.setData({
            isEmpty:true
          })
      }
  },
  handlechangde(){
     // 获取本地的商品列表
     const goods = wx.getStorageSync("goods") || {};
       // 记录状态
       let selected = true;
     // 判断全选状态
     Object.keys(goods).forEach(v=>{
           // 只要有一项的选中状态时false，全选的状态就是false
           if(!selected) return;
       if(!goods[v].select){
        selected = false
      }   
     })

     this.setData({
       goods,
       allselect: selected
     });
     // 计算总价格
     this.getAllprice()
  },
  // 收获地址
  handleadderss(){
    wx.chooseAddress({
      success:(res)=>{
        // console.log(res)
        this.setData({
          address:{
            userName:res.userName,
            telNumber:res.telNumber,
            detailInfo:res.provinceName+res.cityName+res.countyName+res.detailInfo
          }
        });
        wx.setStorageSync('address', this.data.address)
      }
    })
  },
  // 计算总价格
  getAllprice(){
      let price=0;
     Object.keys(this.data.goods).forEach(v=>{
      //  判断是选择的时候才添加
      // 可以解构
      const item=this.data.goods[v]
       if(item.select){
        price +=item.goods_price * item.number
       }
      
     })
     this.setData({
      allprice:price
     });
    //  把当前最新商品列表保存到本地
    wx.setStorageSync('goods', this.data.goods)
  },
  // 选择状态

  handleselect(event){
    // console.log(event)
    const {id}=event.currentTarget.dataset
    const {goods}=this.data
      // 把选中状态取反
    goods[id].select=! goods[id].select
    this.setData({
      goods
    });
    // 计算总价格
    this.getAllprice();
      // 如果当前的selected的值是false时候，要修改全选的状态
      this.handlechangde();
  },
  // 点击增加数量
  handleaddnumber(event){
    const {id}=event.currentTarget.dataset
    const {goods}=this.data
    goods[id].number +=1;
    this.setData({
      goods
    });
     // 计算总价格
     this.getAllprice()
  },
   // 点击减少商品数量
   handlejian(event){
    // console.log(event)
    const {id}=event.currentTarget.dataset
    const {goods}=this.data

    // 判断是否减少到1如果减少到1给予提示
    if(goods[id].number===1){
      wx.showModal({
        title: '提示',
        content: '确定要删除商品吗？',
        success:(res)=>{
          if (res.confirm) {
            // console.log('用户点击确定')
            delete goods[id]
            this.setData({
              goods
            });
           // 计算总价格
     this.getAllprice()
          } 
        }
      })
    }else{
      goods[id].number -=1;
    this.setData({
      goods
    });
     // 计算总价格
     this.getAllprice()
    }   
  },
  // 全选
  handlejuanxuan(){
    const {goods} = this.data;
    Object.keys(goods).forEach(v=>{
      goods[v].select=!this.data.allselect
    })
     // 同时修改data的goods和全部的状态
    this.setData({
      goods,
      allselect:!this.data.allselect
    })
   // 计算总价格
   this.getAllprice()

  },
   
  // 结算
  handlejiesuan(){
      const {goods,address}=this.data
      // 判断收货地址是否为空
      if(!address.userName){
        wx.showToast({
          title: '收货地址不能为空',
          icon:'none'
        });
        return
      }
      if(Object.keys(goods).length===0){
        wx.showToast({
          title: '购物车不能为空',
          icon:'none'
        });
        returns
      }
      // 跳转之前先把选中的商品保存到本地
      const selectgoods=[]
      Object.keys(goods).forEach(v=>{
        // 当前商品
        const item=goods[v]
        if(item.select){
          selectgoods.push(item)
        }
      })
      // 保存到本地
      wx.setStorageSync('select_goods', selectgoods)
      
      wx.navigateTo({
        url: '/pages/order_enter/index',
      })

  }

})