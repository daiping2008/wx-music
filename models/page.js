class PageModel {

  constructor(start, count) {
    this.start = start
    this.count = count
    this.data = []
    this.lock = false
  }

  locked() {
    this.lock = true
  }

  unlock() {
    this.lock = false
  }

  getLock() {
    return this.lock
  }
}

export default PageModel