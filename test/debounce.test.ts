import sinon from 'sinon'
import debounce from '../src/debounce'

describe('housekeeping', () => {
  it('shoule be defined as a function', () => {
    expect(typeof debounce).toBe('function')
  })
})

describe('force execution', () => {
  let clock: sinon.SinonFakeTimers

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('should not execute prior timeout when immediate is false', () => {
    let callback = sinon.spy()

    // set up debounced function with wait of 100
    let handle = debounce(callback, { gap: 100, immediate: false })

    // call debounced function at interval of 50
    setTimeout(handle, 100)
    setTimeout(handle, 150)

    // set the clock to 25 (period of the wait) ticks after the last debounced call
    clock.tick(175)

    // the callback should not have been called yet
    expect(callback.callCount).toEqual(0)
  })

  it('should execute both timeout when immediate is true', () => {
    let callback = sinon.spy()

    let handle = debounce(callback, { gap: 100 })

    setTimeout(handle, 100)
    setTimeout(handle, 150)

    clock.tick(250)

    expect(callback.callCount).toEqual(2)
  })
})
