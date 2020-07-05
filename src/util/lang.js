const hasOwnProperty = Object.prototype.hasOwnProperty

export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

const _toString = Object.prototype.toString

export function toRawType(value) {
  return _toString.call(value).slice(8, -1)
}

export function deepClone(value) {
  let ret
  const type = toRawType(value)

  if (type === 'Object') {
    ret = {}
  } else if (type === 'Array') {
    ret = []
  } else {
    return value
  }

  Object.keys(value).forEach((key) => {
    const copy = value[key]
    ret[key] = deepClone(copy)
  })

  return ret
}

export function deepAssign(origin, mixin) {
  for (const key in mixin) {
    if (!origin[key] || typeof origin[key] !== 'object') {
      origin[key] = mixin[key]
    } else {
      deepAssign(origin[key], mixin[key])
    }
  }
}

export function multiDeepClone(target, ...rest) {
  for (let i = 0; i < rest.length; i++) {
    const clone = deepClone(rest[i])
    deepAssign(target, clone)
  }
  return target
}
