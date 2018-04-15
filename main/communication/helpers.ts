import to from 'await-to-js'
import { ipcMain } from 'electron'
import log from 'electron-log'

// Logs level
log.transports.console.level = log.transports.file.level = process.env.NODE_ENV === 'production'
  ? false
  : process.env.NODE_ENV === 'development' ? 'silly' : 'debug'

export function bindEventToProp(eventName: string, instance: any, prop: string): void {
  ipcMain.on(eventName, (event: any) => {
    log.debug(`ipcMain: ${eventName}`)
    event.returnValue = JSON.stringify(instance[prop])
  })
}

export function bindEventToAsyncCall(eventName: string, call: () => Promise<any>): void {
  ipcMain.on(eventName, async (event: any, argsString: string) => {
    log.debug(`ipcMain: ${eventName}`)
    const [err, res] = await to(call.apply(
      null,
      JSON.parse(argsString).map((arg: any) => arg !== null ? arg : undefined),
    ))
    if (err !== null) {
      log.debug(`ipcMain: ${eventName}:error`, err)
      event.sender.send(`${eventName}:error`, typeof err === 'string' ? err : err.message)

      return
    }

    log.debug(`ipcMain: ${eventName}:success`)
    log.silly(`ipcMain: ${eventName}:success`, res)
    event.sender.send(`${eventName}:success`, JSON.stringify(res))
  })
}

export function bindEventToSyncCall(eventName: string, call: () => any): void {
  ipcMain.on(eventName, (event: any, argsString: string) => {
    // log.debug(`ipcMain: ${eventName}`)

    try {
      // tslint:disable-next-line:no-shadowed-variable
      const res: any = call.apply(null, JSON.parse(argsString).map((arg: any) => arg !== null ? arg : undefined))
      log.debug(`ipcMain: ${eventName}:success`)
      log.silly(`ipcMain: ${eventName}:success`, res)
      event.returnValue = res === undefined ? '' : JSON.stringify(res)
    }
    catch (err) {
      log.debug(`ipcMain: ${eventName}:error`, err)
      event.sender.send(`${eventName}:error`, typeof err === 'string' ? err : err.message)
    }
  })
}
