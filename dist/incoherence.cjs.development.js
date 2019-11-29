'use strict';

var defaultGap = 128;
var defaultOptions = {
  maxGap: Infinity,
  immediate: true
};

function debounce(func, gap, options) {
  if (gap === void 0) {
    gap = defaultGap;
  }

  if (options === void 0) {
    options = defaultOptions;
  }

  if (gap <= 0 || !Number.isFinite(gap)) {
    gap = defaultGap;
  }

  var maxGap = defaultOptions.maxGap,
      immediate = defaultOptions.immediate;

  if (options && options !== defaultOptions) {
    if (options.maxGap && Number.isFinite(options.maxGap) && options.maxGap >= gap) {
      maxGap = options.maxGap;
    }

    if (typeof options.immediate === 'boolean') {
      immediate = options.immediate;
    }
  }

  var shouldExecute = immediate;
  var gapTimer;
  var maxGapTimer;
  var lastReject;

  function skipLastInvoke() {
    if (gapTimer) {
      clearTimeout(gapTimer);
    }

    if (lastReject) {
      lastReject({
        message: 'Cancelled by debounce.'
      });
    }

    gapTimer = undefined;
    lastReject = undefined;
  }

  function resetMaxGapTimer() {
    if (!Number.isFinite(maxGap)) {
      return;
    }

    if (maxGapTimer) {
      clearTimeout(maxGapTimer);
    }

    maxGapTimer = setTimeout(function () {
      shouldExecute = true;
    }, maxGap);
  }

  function resetForImmediateExecution() {
    // don't reset gap timer when throttling either
    if (!immediate || immediate && maxGap === gap) {
      return;
    }

    gapTimer = setTimeout(function () {
      shouldExecute = true;
    }, gap);
  }

  function resetAfterExecution() {
    gapTimer = undefined;
    lastReject = undefined;
    shouldExecute = false;
    resetMaxGapTimer();
    resetForImmediateExecution();
  }

  function execute(args, resolve) {
    resolve(func.apply(this, args));
    resetAfterExecution();
  }

  function handle(args, resolve, reject) {
    skipLastInvoke();

    if (shouldExecute) {
      setTimeout(execute.bind(this, args, resolve), 0);
      shouldExecute = false;
    } else {
      gapTimer = setTimeout(execute.bind(this, args, resolve), gap);
      lastReject = reject;
    }
  }

  function debounced() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var promise = new Promise(handle.bind(this, args));
    promise["catch"](function (reason) {
      return reason;
    });
    return promise;
  }

  return debounced;
}

var defaultGap$1 = 128;

function throttle(func, gap) {
  if (gap === void 0) {
    gap = defaultGap$1;
  }

  if (gap <= 0 || !Number.isFinite(gap)) {
    gap = defaultGap$1;
  }

  return debounce(func, gap, {
    maxGap: gap,
    immediate: true
  });
}

exports.debounce = debounce;
exports.throttle = throttle;
//# sourceMappingURL=incoherence.cjs.development.js.map
