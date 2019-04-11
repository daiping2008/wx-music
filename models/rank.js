import HTTP from '../utils/http.js'

class RankModel extends HTTP {

  getTopList(idx) {
    return this.request(`/top/list?idx=${idx}`)
  }
}

export default RankModel