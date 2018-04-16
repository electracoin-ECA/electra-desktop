import * as storage from 'electron-json-storage'

export default function(): Promise<any> {
  return new Promise((resolve: (userSettings: any) => void) => {
    storage.get('userSettings', (err: Error, userSettings: any) => {
      if (err) throw err

      resolve(userSettings)
    })
  })
}
