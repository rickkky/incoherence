declare const defaultOptions: {
  maxGap: number
  immediate: boolean
}
declare function debounce<A extends [], R>(
  func: (...args: A) => R,
  gap?: number,
  options?: Partial<typeof defaultOptions>,
): (this: any, ...args: A) => Promise<R>
export { debounce }
export default debounce
