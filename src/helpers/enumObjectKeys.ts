// tslint:disable

/**
 * Create a K:V from the keys of a object.
 */
export default function <T extends string>(object: {[K in T]: any}): {[K in T]: K} {
  return Object.keys(object).reduce(
    (enumerator: {[K in T]: K}, objectKey: T) => {
      enumerator[objectKey] = objectKey

      return enumerator
    },
    Object.create(null)
  )
}
