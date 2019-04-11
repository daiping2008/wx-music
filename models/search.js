import HTTP from '../utils/http.js'
import {
  WX_MUSIC_HIS_KEYS
} from '../utils/storage-key.js'

const MAX_COUNT = 10

class SearchModel extends HTTP {
  getSearchKey(offset = 0, q) {
    return this.request(`/search?keywords=${q}&offset=${offset}`)
  }
  getSearchHot() {
    return this.request('/search/hot')
  }

  setHis(data) {
    if (!data) return

    const s = this.getHis()
    // 如果是空
    if (!s && s.length === 0) {
      wx.setStorageSync(WX_MUSIC_HIS_KEYS, [data])
      return
    }
    // 如果重复
    for (let i = 0; i < s.length; i++) {
      if (s[i] === data) return
    }
    // 如果大于10
    if (s.length >= MAX_COUNT) {
      s.shift()
    }

    s.push(data)

    wx.setStorageSync(WX_MUSIC_HIS_KEYS, s)

  }

  getHis() {
    return wx.getStorageSync(WX_MUSIC_HIS_KEYS)
  }

  delHis(index) {
    const his = this.getHis()
    his.reverse().splice(index, 1)
    wx.setStorageSync(WX_MUSIC_HIS_KEYS, his.reverse())
  }

  clearHis() {
    wx.setStorageSync(WX_MUSIC_HIS_KEYS, [])
  }
}

export default SearchModel