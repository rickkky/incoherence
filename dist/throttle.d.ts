declare function throttle<A extends any[], R = void>(
  func: (...args: A) => R,
  gap?: number,
): (this: any, ...args: A) => Promise<R>
export { throttle }
export default throttle
