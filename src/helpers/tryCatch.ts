import throwError, { ERROR } from './throwError'

export default async function<T = undefined>(promise: Promise<T>, errorCode: keyof typeof ERROR): Promise<T | void> {
  return promise
    .then((data: T | undefined) => data)
    .catch((err: Error | string) => {
      throwError(errorCode, typeof err === 'string' ? new Error(err) : err)
    })
}
