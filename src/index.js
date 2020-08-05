import { multiDeepClone } from './util/lang'

const DEFAULT_INTERVAL = 100 / 6
const noop = function () { }

let timeStart

const requestAnimationFrame = (() => {
  return function (cb) {
    return setTimeout(() => {
      const timestamp = new Date().getTime()
      if (!timeStart) {
        timeStart = timestamp
      }
      const timeCurrent = timestamp - timeStart
      cb(timeCurrent)
    }, DEFAULT_INTERVAL)
  }
})()

const cancelAnimationFrame = (() => {
  return function (id) {
    return clearTimeout(id)
  }
})()

// t: 时间占比
function easeInOutQuad(t) {
  return 1 - (--t * t * t * t)
}

class Move {
  constructor(options) {
    this._offset = multiDeepClone({}, options.offset)
    this._beginProgress = options.beginProgress || 0
    this.beginProgress = this._beginProgress
    this.duration = options.duration
    this.between = options.between
    this.easing = options.easing
    this.stepCallback = options.stepCallback
    this.doneCallback = options.doneCallback
    this.isAuto = options.isAuto
    this.isLoop = options.isLoop
    if (this.isAuto) {
      this.start()
    }
  }
  clearOffset() {
    this.offset = {}
    for (const key in this._offset) {
      const begin = this._offset[key].begin || 0
      const end = this._offset[key].end
      this.offset[key] = {
        begin,
        end,
      }
    }
  }
  loop(timeCurrent) {
    if (!this.isRunning) {
      return
    }
    this.update(timeCurrent)
    this.timeCurrent < this.duration
      ? this.continueHandler()
      : this.doneHandler()
  }
  continueHandler() {
    this.setTransform()
    this.requestAnimationFrameId = requestAnimationFrame((timeCurrent) => {
      timeCurrent += this.beginProgress * this.duration
      this.loop(timeCurrent)
    })
  }
  doneHandler() {
    this.timeCurrent = this.duration
    this.setTransform()
    if (typeof this.doneCallback === 'function') {
      this.doneCallback()
    }
    if (this.isLoop) {
      clearTimeout(this.betweenTimeout)
      this.betweenTimeout = setTimeout(() => {
        this.loopStart()
      }, this.between)
    }
  }
  update(timeCurrent) {
    this.timeCurrent = timeCurrent - this.timeStart
  }
  setTransform() {
    let transform = ''
    const progress = this.duration ? this.timeCurrent / this.duration : 1

    for (const key in this.offset) {
      const begin = this.offset[key].begin
      const end = this.offset[key].end
      if (this.timeCurrent < this.duration) {
        const next = (end - begin) * progress * this.easing(progress) + begin
        transform += `${key}(${next}px) `
      } else {
        transform += `${key}(${end}px) `
      }
    }

    this.stepCallback({
      transform,
      progress,
    })
  }
  start() {
    this.clearOffset()
    this.cleanRunning()
    this.requestAnimationFrameId = requestAnimationFrame((timeCurrent) => {
      this.timeStart = timeCurrent
      timeCurrent += this.beginProgress * this.duration
      this.isRunning = true
      this.loop(timeCurrent)
    })
  }
  cleanRunning() {
    this.isRunning = false
    cancelAnimationFrame(this.requestAnimationFrameId)
  }
  loopStart() {
    this.beginProgress = 0
    this.start()
  }
  restart() {
    this.beginProgress = this._beginProgress
    this.start()
  }
  destroy() {
    this.cleanRunning()
  }
}

const animation = (options) => {
  const defaultOptions = {
    offset: {},
    duration: 1000,
    between: 0,
    easing: easeInOutQuad,
    doneCallback: noop,
    stepCallback: noop,
    isAuto: true,
    isLoop: false,
  }
  return new Move(multiDeepClone({}, defaultOptions, options))
}

animation.version = 'VERSION'

export default animation
