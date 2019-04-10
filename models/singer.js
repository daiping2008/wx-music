import HTTP from '../utils/http.js'

class SingerModel extends HTTP {

  getSinger() {
    return this.request('/top/artists')
  }
}

export default SingerModel