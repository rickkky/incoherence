# incoherence

[![npm version](https://badge.fury.io/js/incoherence.svg)](https://badge.fury.io/js/incoherence)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Install

```
npm i -S incoherence
```

## Comparison

Here is an example to show the difference between regular, debounced and throttled invocations: [Visual comparison](https://rickkky.github.io/incoherence/examples/visualization.html).

## API

### debounce

```typescript
function debounce<A extends [], R>(
  func: (...args: A) => R,
  gap?: number = 128,
  options?: Partial<{
    maxGap: number
    immediate: boolean
  }> = {
    maxGap: Infinity,
    immediate: true,
  },
): (this: any, ...args: A) => Promise<R>
```

### throttle

```typescript
function throttle<A extends [], R>(
  func: (...args: A) => R,
  gap?: number = 128,
): (this: any, ...args: A) => Promise<R>
```

## Examples

```typescript
import { debounce, throttle } from 'incoherence'

window.onresize = throttle(() => {
  console.log(window.innerWidth, window.innerHeight)
}, 100)
```
