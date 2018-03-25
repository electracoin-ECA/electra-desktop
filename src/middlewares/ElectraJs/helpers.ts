import { ipcRenderer } from 'electron'

export function bindEventToSyncCall<T>(eventName: string, args?: IArguments): T {
  return JSON.parse(ipcRenderer
    .sendSync(eventName, JSON.stringify(Array.prototype.slice.call(args)))
  )
}

export async function bindEventToAsyncCall<T>(eventName: string, args?: IArguments): Promise<T> {
  return new Promise((resolve: (res: T) => void, reject: (err: Error) => void): void => {
    ipcRenderer
      .on(`${eventName}:success`, (event: any, resString: string): void => resolve(JSON.parse(resString)))
      .on(`${eventName}:error`, (event: any, err: string): void => reject(new Error(err)))

    ipcRenderer
      .send(eventName, JSON.stringify(Array.prototype.slice.call(args)))
  })
}
