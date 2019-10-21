class Cache {
  constructor(maxEntries) {
    this.maxEntries = Math.min(maxEntries, 10)
    this.entryCount = 0
    this.refCounts = {}
    this.cache = {}
  }

  evictLru() {
    let min = Number.MAX_VALUE,
      index = null

    for (const prop in this.refCounts) {
      const count = this.refCounts[prop]
      if (count === 1) {
        this.cache[prop] = null
        delete this.cache[prop]

        this.refCounts[prop] = null
        delete this.refCounts[prop]

        break
      }
      if (count < min) {
        min = count
        index = prop
      }
    }

    if (index !== null) {
      this.cache[index] = null
      delete this.cache[index]

      this.refCounts[index] = null
      delete this.refCounts[index]
    }
  }

  put(key, value) {
    if (this.cache[key]) {
      this.cache[key] = value
      this.refCounts[key] = this.refCounts[key] + 1
      return
    }

    if (this.entryCount + 1 === this.maxEntries) {
      this.evictLru()
    }

    this.cache[key] = value
    this.refCounts[key] = 1
  }

  get(key) {
    if (this.cache[key]) {
      this.refCounts[key] = this.refCounts[key] + 1
      return this.cache[key]
    }
    return null
  }
}

const instance = new Cache(1000)

export default instance
