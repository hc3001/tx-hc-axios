import { ResolvedFn, RejectedFn } from '../types'

interface Intercepter<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T> {
  private intercepters: Array<Intercepter<T> | null>

  constructor() {
    this.intercepters = []
  }

  use(resolved: ResolvedFn<T>, rejected: RejectedFn): number {
    this.intercepters.push({
      resolved,
      rejected
    })
    return this.intercepters.length - 1
  }

  forEach(fn: (intercepter: Intercepter<T>) => void): void {
    this.intercepters.forEach(intercepter => {
      if (intercepter !== null) {
        fn(intercepter)
      }
    })
  }

  eject(id: number): void {
    if (this.intercepters[id]) {
      this.intercepters[id] = null
    }
  }
}
