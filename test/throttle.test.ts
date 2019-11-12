import sinon from 'sinon'
import throttle from '../src/throttle'

describe('housekeeping', () => {
  it('shoule be defined as a function', () => {
    expect(typeof throttle).toBe('function')
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

  it('shoule not execute second timeout', () => {
    let callback = sinon.spy()

    let handle = throttle(callback, 100)

    setTimeout(handle, 100)
    setTimeout(handle, 150)
    setTimeout(handle, 205)

    clock.tick(210)

    expect(callback.callCount).toEqual(2)
  })
})
