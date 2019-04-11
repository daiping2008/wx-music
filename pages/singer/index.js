import SingerModel from '../../models/singer.js'

const singerModel = new SingerModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    singer: [],
    more: 0,
    lock: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      lock:true
    })
    singerModel.getSinger()
      .then(res => {
        this.setData({
          singer: res.artists,
          more: res.more,
          lock:false
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // 判断是否锁住
    if (this.data.lock || !this.data.more) return

    // 加锁
    this.setData({
      lock: true
    })

    singerModel.getSinger(this.data.singer.length)
      .then(res => {
        this.data.singer = this.data.singer.concat(res.artists)
        this.setData({
          singer: this.data.singer,
          lock: false,
          more: res.more
        })
      })
      .catch(err => {
        this.setData({
          lock: false
        })
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})