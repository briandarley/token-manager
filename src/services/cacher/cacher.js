
export class Cacher {

    constructor(option) {
      this.cacheMap = new Map()
      this.option = option || {}
      this.maxCacheSize = this.option.maxCacheSize || 15
      this.ttl = this.option.ttl
      this.filters = []
      this.excludeHeaders = this.option.excludeHeaders || false
    }
  
    /**
     * [addFilter add matching rules]
     * @param {[reg]} reg
     */
    addFilter(reg) {
      this.filters.push(reg)
    }
  
    /**
     * [removeFilter removes matching rules]
     * @param  {[reg]} reg
     */
    removeFilter(reg) {
      let index = this.filters.indexOf(reg)
      if(index !== -1) {
        this.filters.splice(index, 1)
      }
    }
  
    /**
     * [setCache add cache]
     * @param {[any]} key
     * @param {[any]} value
     */
    setCache(key, value) {
      if(this.excludeHeaders) delete key.headers
  
      this.cacheMap.set(JSON.stringify(key), value)
      if(this.maxCacheSize && this.cacheMap.size > this.maxCacheSize) {
        this.cacheMap.delete([...(this.cacheMap).keys()][0])
      }
      if(this.ttl) {
        setTimeout(() => {
          if(this.hasCache(key)) {
            this.cacheMap.delete(JSON.stringify(key))
          }
        }, this.ttl)
      }
    }
  
    /**
     * [needCache checks if matching rules are hit]
     * @param  {[obj]} option
     * @return {[boolean]}
     */
    needCache(option) {
      return this.filters.some(reg => {
        return reg.test(option.url)
      })
    }
  
    /**
     * [hasCache Whether there is a cache]
     * @param  {[any]}  key
     * @return {Boolean}
     */
    hasCache(key) {
      return this.cacheMap.has(JSON.stringify(key))
    }
  
    /**
     * [getCache Get cache content]
     * @param  {[any]} key
     * @return {[any]}
     */
    getCache(key) {
      return this.cacheMap.get(JSON.stringify(key))
    }
  
    /**
     * [clear the cache]
     */
    clear() {
      this.cacheMap.clear()
    }
  
  }