/* eslint-disable no-debugger */

import {Cacher} from './cacher.js'

/**
 * [wrapper]
 * @param  {[axios instance]} instance
 * @param  {[obj]} option
 * @return {[axios instance with cache feature]}
 */
export default function wrapper(instance, option) {

  const cacher = new Cacher(option)

  const unCacheMethods = [
    'delete',
    'head',
    'options',
    'post',
    'put',
    'patch'
  ]

  /**
   * [axiosWithCache axios instance Proxy]
   * @param  {...[any]} arg
   * @return {[promise]}
   */
  function axiosWithCache(...arg) {
    if(arg.length === 1 && (arg[0].method === 'get' || arg[0].method === undefined)) {
      return requestWithCacheCheck(arg[0], instance, ...arg)
    }else {
      return instance(...arg)
    }
  }

  /**
   * [requestWithCacheCheck for get request to check cache，return result promise]
   * @param  {[obj]}    option
   * @param  {[request handler func]}    func
   * @param  {...[any]} arg
   * @return {[promise]}
   */
  function requestWithCacheCheck(option, func, ...arg) {
    if(cacher.needCache(option)) {
      if(cacher.hasCache(option)) {
        return Promise.resolve({
          __fromAxiosCache: true,
          ...cacher.getCache(option)
        })
      }else {
        return func(...arg).then(response => {
          cacher.setCache(option, response)
          return response
        })
      }
    }else {
      return instance(...arg)
    }
  }

  /**
   * [get axios instance get function proxy]
   * @param  {...[any]} arg
   * @return {[promise]}
   */
  axiosWithCache.get = function(...arg) {
    
    if(arg.length === 1) {
      return requestWithCacheCheck({
        url: arg[0]
      }, instance.get, ...arg)
    }else if(arg.length === 2) {
      return requestWithCacheCheck({
        url: arg[0],
        ...arg[1]
      }, instance.get, ...arg)
    }else {
      return instance.get(...arg)
    }
  }

  /**
   * [__addFilter cacher instance addFilter function proxy]
   * @param  {[reg]} filter
   */
  axiosWithCache.__addFilter = function(filter) {
    cacher.addFilter(filter)
  }

  /**
   * [__removeFilter cacher instance removeFilter function proxy]
   * @param  {[reg]} filter
   */
  axiosWithCache.__removeFilter = function(filter) {
    cacher.removeFilter(filter)
  }

  /**
   * [cacher instance proxy]
   */
  axiosWithCache.__cacher = cacher

  /**
   * [__clearCache cacher instance clear function proxy]
   */
  axiosWithCache.__clearCache = function(){
    cacher.clear()
  }

  /**
   * [proxy axios instance functions which are no need to be cached]
   */
  unCacheMethods.forEach(method => {
    axiosWithCache[method] = function(...arg) {
      return instance[method](...arg)
    }
  })

  return axiosWithCache
}