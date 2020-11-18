import { isPlainObject } from './util'

export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    let r = JSON.parse(data)
    if (isPlainObject(r)) {
      data = r
    }
  }
  return data
}
