class LinkNode {
    constructor(key, value) {
      this.key = key
      this.value = value
    }
  }
  
  export default class LRUCache {
    hashMap = {}
    num = 0
  
    constructor(capacity) {
      this.capacity = capacity
    }
  
    get(key) {
      if(this.hashMap[key] !== undefined) {
        this._addToTail(this.hashMap[key])
        return this.hashMap[key].value
      }else {
        return -1
      }
    }
  
    put(key, value) {
      if(this.hashMap[key]) {
        this.hashMap[key].value = value
        this._addToTail(this.hashMap[key])
      }else if(this.num >= this.capacity){
        // Delete the least recently accessed and add..
        this._removeLRU()
        this.hashMap[key] = new LinkNode(key, value)
        this._addToTail(this.hashMap[key])
        this.num++
      }else {
        // add directly
        this.hashMap[key] = new LinkNode(key, value)
        this._addToTail(this.hashMap[key])
        this.num++
      }
    }
  
    _addToTail(node) {
      // The first element added. Initialize head and tail
      if(!this.tail) {
        this.head = this.tail = node
        return
      }
      // This element is tail, unchanged
      if(this.tail === node) {
        return
      }
      let prev = node.prev
      let next = node.next
  
      // The element is in the middle, remove, fix before and after nodes
      if(prev && next) {
        prev.next = next
        next.prev = prev
        node.next = null
      }
  
      // The element is the head, which is placed at the end. head update
      if(!prev && next) {
        next.prev = null
        this.head = next
      }
  
      // update tail
      this.tail.next = node
      node.prev = this.tail
      this.tail = node
      node.next = null
    }
  
    // Remove least recently used nodes
    _removeLRU() {
      let target = this.head
      let next = target.next
      if(next) {
        next.prev = null
        this.head = next
      }else {
        this.head = null
        this.tail = null
      }
      delete this.hashMap[target.key]
      this.num--
    }
  }