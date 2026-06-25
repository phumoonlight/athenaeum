export namespace CommonValidator {
  export const isPlainObject = (value: any): boolean => (
    Object.prototype.toString.call(value) === '[object Object]'
  )
}

