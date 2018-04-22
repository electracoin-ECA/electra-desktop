import { ipcRenderer } from 'electron'

export function bindEventToSyncCall<T>(eventName: string, args?: IArguments): T {
  const res: string = ipcRenderer.sendSync(eventName, JSON.stringify(Array.prototype.slice.call(args)))

  return res.length === 0 ? undefined : JSON.parse(res)
}

export async function bindEventToAsyncCall<T>(eventName: string, args?: IArguments): Promise<T> {
  return new Promise((resolve: (res: T) => void, reject: (err: Error) => void): void => {
    const eventId = +Date.now()

    ipcRenderer
      .on(`${eventName}:${eventId}:success`, (event: any, resString: string): void => {
        resolve(JSON.parse(resString))
        ipcRenderer.removeAllListeners(`${eventName}:${eventId}:success`)
        ipcRenderer.removeAllListeners(`${eventName}:${eventId}:error`)
      })
      .on(`${eventName}:${eventId}:error`, (event: any, err: string): void => {
        reject(new Error(err))
        ipcRenderer.removeAllListeners(`${eventName}:${eventId}:success`)
        ipcRenderer.removeAllListeners(`${eventName}:${eventId}:error`)
      })

    ipcRenderer
      .send(eventName, JSON.stringify({ eventId, args: Array.prototype.slice.call(args) }))
  })
}
