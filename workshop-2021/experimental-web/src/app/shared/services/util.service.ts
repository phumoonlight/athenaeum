import { Injectable } from '@angular/core'

interface AnyObject {
  [key: string]: any
}

@Injectable()
export class UtilService {

  constructor() { }

  removeObjectUndefKey(object: AnyObject): void {
    Object.keys(object).forEach((key) => {
      if (object[key] === undefined) {
        delete object[key]
      }
    })
  }

  removeObjectFalsyKey(object: AnyObject): void {
    Object.keys(object).forEach((key) => {
      if (!object[key]) {
        delete object[key]
      }
    })
  }
}
