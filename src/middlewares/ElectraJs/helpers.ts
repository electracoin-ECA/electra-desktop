import { ipcRenderer } from 'electron'

export function bindEventToSyncCall<T>(eventName: string, args?: IArguments): T {
  const res: string = ipcRenderer.sendSync(eventName, JSON.stringify(Array.prototype.slice.call(args)))

  return res.length === 0 ? undefined : JSON.parse(res)
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
