import HTTP from '../utils/http.js'

class RecommendModel extends HTTP {

  getBanner() {
    return this.request('/banner')
  }

  getRecommend() {
    return this.request('/personalized')
  } 
}

export default RecommendModel