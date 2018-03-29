import to from 'await-to-js'
import { ipcMain } from 'electron'

export function bindEventToProp(eventName: string, instance: any, prop: string): void {
  ipcMain.on(eventName, (event: any) => {
    console.info(`ipcMain: ${eventName}`)
    event.returnValue = JSON.stringify(instance[prop])
  })
}

export function bindEventToAsyncCall(eventName: string, call: () => Promise<any>): void {
  ipcMain.on(eventName, async (event: any, argsString: string) => {
    console.info(`ipcMain: ${eventName}`)
    const [err, res] = await to(call.apply(null, JSON.parse(argsString)))
    if (err !== null) {
      console.info(`ipcMain: ${eventName}:error`, err)
      event.sender.send(`${eventName}:error`, err.message)

      return
    }

    console.info(`ipcMain: ${eventName}:success`, res)
    event.sender.send(`${eventName}:success`, JSON.stringify(res))
  })
}

export function bindEventToSyncCall(eventName: string, call: () => Promise<any>): void {
  ipcMain.on(eventName, (event: any, argsString: string) => {
    console.info(`ipcMain: ${eventName}`)

    try {
      // tslint:disable-next-line:no-shadowed-variable
      const res: any = call.apply(null, JSON.parse(argsString))
      console.info(`ipcMain: ${eventName}:success`, res)
      event.returnValue = JSON.stringify(res)
    }
    catch (err) {
      console.info(`ipcMain: ${eventName}:error`, err)
      event.sender.send(`${eventName}:error`, err.message)
    }
  })
}
