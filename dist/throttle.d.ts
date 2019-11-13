declare function throttle<A extends [], R>(
  func: (...args: A) => R,
  gap?: number,
): (this: any, ...args: A) => Promise<R>
export { throttle }
export default throttle
