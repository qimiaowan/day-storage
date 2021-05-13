
/**
 * 抽象 localStorage 带过期时间
 * author: lidong
 * 
 */

class DayStorage {
  private storage:Storage
  constructor() {
    this.storage = window.localStorage || localStorage
  }
  setItem(key: string, val: string, _expires?: string| number | Date) {
    let d:string = val
    if(_expires) {
      if(typeof _expires ==='string') {
        d = d+ '-' +new Date(_expires).getTime()
      } else if(typeof _expires === 'number'){
        d = d + '-' + (new Date().getTime() + _expires)
      } else {
        d = d+'-'+_expires.getTime()
      }
    }
    this.storage.setItem(key,d)
  }
  getItem(key:string) {
    const item: any = this.storage.getItem(key)
    if(item) {
      const s:string[] = item.split("-")
      const date = new Date(Number(s[1]))
      if(Date.now() > date.getTime()) {
        this.storage.removeItem(key)
        return '已经过期了'
      } else {
        return s[0]
      }

    } else {
      return null
    }
  }
  clear(){
    this.storage.clear()
  }
}

export default {
  DayStorage: new DayStorage()
}

