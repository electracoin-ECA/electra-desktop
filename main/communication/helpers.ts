import to from 'await-to-js'
import { ipcMain } from 'electron'

const isProd: boolean = process.env.NODE_ENV === 'production'

export function bindEventToProp(eventName: string, instance: any, prop: string): void {
  ipcMain.on(eventName, (event: any) => {
    if (!isProd) console.info(`ipcMain: ${eventName}`)
    event.returnValue = JSON.stringify(instance[prop])
  })
}

export function bindEventToAsyncCall(eventName: string, call: () => Promise<any>): void {
  ipcMain.on(eventName, async (event: any, argsString: string) => {
    if (!isProd) console.info(`ipcMain: ${eventName}`)
    const [err, res] = await to(call.apply(null, JSON.parse(argsString)))
    if (err !== null) {
      if (!isProd) console.info(`ipcMain: ${eventName}:error`, err)
      event.sender.send(`${eventName}:error`, typeof err === 'string' ? err : err.message)

      return
    }

    if (!isProd) console.info(`ipcMain: ${eventName}:success`, res)
    event.sender.send(`${eventName}:success`, JSON.stringify(res))
  })
}

export function bindEventToSyncCall(eventName: string, call: () => any): void {
  ipcMain.on(eventName, (event: any, argsString: string) => {
    if (!isProd) console.info(`ipcMain: ${eventName}`)

    try {
      // tslint:disable-next-line:no-shadowed-variable
      const res: any = call.apply(null, JSON.parse(argsString))
      if (!isProd) console.info(`ipcMain: ${eventName}:success`, res)
      event.returnValue = res === undefined ? '' : JSON.stringify(res)
    }
    catch (err) {
      if (!isProd) console.info(`ipcMain: ${eventName}:error`, err)
      event.sender.send(`${eventName}:error`, typeof err === 'string' ? err : err.message)
    }
  })
}
