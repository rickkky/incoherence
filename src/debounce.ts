const defaultGap = 128

const defaultOptions = {
  maxGap: Infinity,
  immediate: true,
}

function debounce<A extends any[], R = void>(
  func: (...args: A) => R,
  gap = defaultGap,
  options: Partial<typeof defaultOptions> = defaultOptions,
) {
  if (gap <= 0 || !Number.isFinite(gap)) {
    gap = defaultGap
  }

  let { maxGap, immediate } = defaultOptions

  if (options && options !== defaultOptions) {
    if (
      options.maxGap &&
      Number.isFinite(options.maxGap) &&
      options.maxGap >= gap
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
    // don't reset gap timer when throttling either
    if (!immediate || (immediate && maxGap === gap)) {
      return
    }

    gapTimer = setTimeout(() => {
      shouldExecute = true
    }, gap)
  }

  function resetAfterExecution() {
    gapTimer = undefined
    lastReject = undefined
    shouldExecute = false

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
    const promise = new Promise<R>(handle.bind(this, args))

    promise.catch((reason) => reason)

    return promise
  }

  return debounced
}

export { debounce }

export default debounce
