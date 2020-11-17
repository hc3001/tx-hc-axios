import { isDate, isPlainObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildUrl(url: string, params?: any): string {
  if (!params) {
    return url
  }
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    let val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(va => {
      if (isDate(va)) {
        va = va.toISOString()
      } else if (isPlainObject(va)) {
        va = JSON.stringify(va)
      }
      parts.push(`${encode(key)}=${encode(va)}`)
    })
  })

  let serializedParams = parts.join('&')
  if (serializedParams) {
    let markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    if (url.indexOf('?') !== -1) {
      url += '&' + serializedParams
    } else {
      url += '?' + serializedParams
    }
  }
  return url
}
