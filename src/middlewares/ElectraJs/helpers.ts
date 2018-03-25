import { ipcRenderer } from 'electron'

export function bindEventToSyncCall<T>(eventName: string, args?: IArguments): T {
  return ipcRenderer
      .sendSync(eventName, args === undefined ? '' : JSON.stringify(Array.prototype.slice.call(args)))
}

export async function bindEventToAsyncCall<T>(eventName: string, args?: IArguments): Promise<T> {
  return new Promise((resolve: (res: T) => void, reject: (err: Error) => void): void => {
    ipcRenderer
      .on(`${eventName}:success`, (event: any, res: string): void => resolve(JSON.parse(res)))
      .on(`${eventName}:error`, (event: any, err: string): void => reject(new Error(err)))

    ipcRenderer
      .send(eventName, args === undefined ? '' : JSON.stringify(Array.prototype.slice.call(args)))
  })
}
