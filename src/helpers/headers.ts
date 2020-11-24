import { deepMerge, isPlainObject } from './util'
import { Method } from '../types'

function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (
      name !== normalizeName &&
      name.toUpperCase() === normalizeName.toUpperCase()
    ) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeader(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-type']) {
      headers['Content-type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseHeaders(headers: string): object {
  const parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  headers.split('\r\n').forEach(header => {
    let [name, value] = header.split(':')
    name = name.trim().toLowerCase()
    if (!name) {
      return
    }
    if (value) {
      value = value.trim()
    }
    parsed[name] = value
  })
  return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }

  headers = deepMerge(headers.common, headers[method], headers)

  const methodsToDelete = [
    'delete',
    'get',
    'head',
    'options',
    'post',
    'put',
    'patch',
    'common'
  ]

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
