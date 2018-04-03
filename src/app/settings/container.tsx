import { remote } from 'electron'
import * as React from 'react'

export default class Settings extends React.Component<{}, {}> {
  render(): JSX.Element {
    return (
      <div className='c-view'>
        <div className='c-view__header'>
          <h2>Settings</h2>
        </div>
        <div className='c-view__content'>
          {remote.app.getVersion()}
        </div>
      </div>
    )
  }
}
