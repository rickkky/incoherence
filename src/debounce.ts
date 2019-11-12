const defaultOptions = {
  gap: 128,
  maxGap: Infinity,
  immediate: true,
}

/**
 * @param func
 * @param options
 */
function debounce<A extends [], R>(
  func: (...args: A) => R,
  options: Partial<typeof defaultOptions> = defaultOptions,
) {
  let { gap, maxGap, immediate } = defaultOptions

  if (options && options !== defaultOptions) {
    if (options.gap && Number.isFinite(options.gap) && options.gap > 0) {
      gap = options.gap
    }

    if (
      options.maxGap &&
      Number.isNaN(options.maxGap) &&
      options.maxGap > gap
    ) {
      maxGap = options.maxGap
    }

    if (typeof options.immediate === 'boolean') {
      immediate = options.immediate
    }
  }

  let shouldExecute = immediate
  let gapTimer: ReturnType<typeof setTimeout> | undefined
  let maxGapTimer: ReturnType<typeof setTimeout> | undefined
  let lastReject: ((reason?: any) => void) | undefined

  function skipLastInvoke() {
    if (gapTimer) {
      clearTimeout(gapTimer)
    }

    if (lastReject) {
      lastReject({ message: 'Cancelled by debounce.' })
    }

    gapTimer = undefined
    lastReject = undefined
  }

  function resetMaxGapTimer() {
    if (!Number.isFinite(maxGap)) {
      return
    }

    if (maxGapTimer) {
      clearTimeout(maxGapTimer)
    }

    maxGapTimer = setTimeout(() => {
      shouldExecute = true
    }, maxGap)
  }

  function resetForImmediateExecution() {
    if (!immediate) {
      return
    }

    gapTimer = setTimeout(() => {
      shouldExecute = true
    }, gap)
  }

  function resetAfterExecution() {
    gapTimer = undefined
    lastReject = undefined

    resetMaxGapTimer()
    resetForImmediateExecution()
  }

  function execute(this: any, args: A, resolve: (value?: R) => void) {
    resolve(func.apply(this, args))
    resetAfterExecution()
  }

  function handle(
    this: any,
    args: A,
    resolve: (value?: R) => void,
    reject: (reason?: any) => void,
  ) {
    skipLastInvoke()

    if (shouldExecute) {
      setTimeout(execute.bind(this, args, resolve), 0)
      shouldExecute = false
    } else {
      gapTimer = setTimeout(execute.bind(this, args, resolve), gap)
      lastReject = reject
    }
  }

  function debounced(this: any, ...args: A): Promise<R> {
    return new Promise<R>(handle.bind(this, args)).catch()
  }

  return debounced
}

export { debounce }

export default debounce
