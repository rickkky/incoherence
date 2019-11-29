declare const defaultOptions: {
  maxGap: number
  immediate: boolean
}
declare function debounce<A extends any[], R = void>(
  func: (...args: A) => R,
  gap?: number,
  options?: Partial<typeof defaultOptions>,
): (this: any, ...args: A) => Promise<R>
export { debounce }
export default debounce
