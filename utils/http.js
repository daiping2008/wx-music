import {
  config
}
from '../config.js'
class HTTP {

  request(url, data, method = 'GET') {
    return new Promise(function(resolve, reject) {
      return wx.request({
        url: config.baseUrl + url,
        data,
        method,
        success: function(res) {
          resolve(res.data)
        },
        fail: function(err) {
          reject(err)
        }
      })
    })
  }
}

export default HTTP