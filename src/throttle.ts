import debounce from './debounce'

const defaultGap = 128

function throttle<A extends [], R>(func: (...args: A) => R, gap = defaultGap) {
  if (gap <= 0 || !Number.isFinite(gap)) {
    gap = defaultGap
  }

  return debounce(func, gap, { maxGap: gap, immediate: true })
}

export { throttle }

export default throttle
