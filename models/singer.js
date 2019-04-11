import HTTP from '../utils/http.js'

class SingerModel extends HTTP {

  getSinger(offset = 0, limit = 50) {
    return this.request(`/top/artists?offset=${offset}&limit=${limit}`)
  }
}

export default SingerModel