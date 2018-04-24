import { remote } from 'electron'

import { ERROR, ERRORS } from './throwError.data'
export { ERROR }

// tslint:disable-next-line:no-inferrable-types
export default function(code: keyof typeof ERROR, error?: Error, hasToQuit: boolean = true): void {
  let alertMessage = `Sorry, an unexpected error happened.`
  alertMessage += `\n\n[${code}] ${ERRORS[code]}`
  if (error !== undefined) alertMessage += `\n\n${error.stack}`
  window.alert(alertMessage)
  if (hasToQuit) remote.app.quit()
}
