import SearchModel from '../../models/search.js'
const searchModel = new SearchModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hot: [],
    his: [],
    songs: [],
    finished: false,
    q: '',
    lock: false,
    songCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._getHis()
    searchModel.getSearchHot()
      .then(res => {
        this.setData({
          hot: res.result.hots
        })
      })
  },
  bindConfirm(e) {
    const q = e.detail.value || e.target.dataset.q
    if (!q) return
    this._hideKeys()
    this._setQ(q)
    searchModel.setHis(q)
    this.setData({
      lock: true
    })
    searchModel.getSearchKey(0, q)
      .then(res => {
        this.setData({
          songs: res.result.songs,
          songCount: res.result.songCount,
          lock: false
        })
      })
      .catch(err => {
        this.setData({
          lock: false
        })
      })
  },
  delHis(e) {
    const index = e.target.dataset.index
    searchModel.delHis(index)
    this._getHis()
  },
  clearHis() {
    searchModel.clearHis()
    this._getHis()
  },
  clear() {
    this._showKeys()
    this.setData({
      songs: []
    })
    this._clearQ()
    this._getHis()
  },
  _loadMoreSong() {
    if (this.data.songs.length >= this.data.songCount) return

    if (this.data.lock) return

    this.setData({
      lock: true
    })

    searchModel.getSearchKey(this.data.songs.length, this.data.q)
      .then(res => {
        this.data.songs = this.data.songs.concat(res.result.songs)
        this.setData({
          songs: this.data.songs,
          lock: false
        })
      })
      .catch(err => {
        this.setData({
          lock: false
        })
      })

  },
  _getHis() {
    this.setData({
      his: searchModel.getHis()
    })
  },
  _clearQ() {
    this.setData({
      q: ''
    })
  },
  _setQ(q) {
    this.setData({
      q
    })
  },
  _hideKeys() {
    this.setData({
      finished: true
    })
  },

  _showKeys() {
    this.setData({
      finished: false
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
    this._loadMoreSong()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})