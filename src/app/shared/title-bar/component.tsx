import { remote } from 'electron'
import * as React from 'react'

const styles: any = require('./styles.css')

const mainWindow = remote.getCurrentWindow()

export default class TitleBar extends React.PureComponent {
  public componentDidMount(): void {
    mainWindow.on('maximize', () => this.forceUpdate())
    mainWindow.on('unmaximize', () => this.forceUpdate())
  }

  private getIconClose(): JSX.Element {
    return (
      <svg viewBox='0 0 10 10'>
        <line x1='0.5' y1='0.5' x2='9.5' y2='9.5' stroke='#000000' />
        <line x1='0.5' y1='9.5' x2='9.5' y2='0.5' stroke='#000000' />
      </svg>
    )
  }

  private getIconMinimize(): JSX.Element {
    return (
      <svg viewBox='0 0 10 10'>
        <line x1='0.5' y1='5.5' x2='9.5' y2='5.5' stroke='#000000' />
      </svg>
    )
  }

  private getIconMaximize(): JSX.Element {
    return (
      <svg viewBox='0 0 10 10'>
        <rect
          x='0.5' y='0.5' width='9' height='9'
          style={{
            fill: '#fbfaff',
            stroke: '#000000',
            strokeWidth: 1,
          }}
        />
      </svg>
    )
  }

  private getIconUnmaximize(): JSX.Element {
    return (
      <svg viewBox='0 0 10 10'>
        <rect
          x='2.5' y='0.5' width='7' height='7'
          style={{
            fill: '#fbfaff',
            stroke: '#000000',
            strokeWidth: 1,
          }}
        />
        <rect
          x='0.5' y='2.5' width='7' height='7'
          style={{
            fill: '#fbfaff',
            stroke: '#000000',
            strokeWidth: 1,
          }}
        />
      </svg>
    )
  }

  public render(): JSX.Element {
    return (
      <div className={styles.container}>
        <div className={styles.button} onClick={() => mainWindow.minimize()}>{this.getIconMinimize()}</div>
        {mainWindow.isMaximized()
         ? <div className={styles.button} onClick={() => mainWindow.unmaximize()}>{this.getIconUnmaximize()}</div>
         : <div className={styles.button} onClick={() => mainWindow.maximize()}>{this.getIconMaximize()}</div>
        }
        <div className={styles.button} onClick={() => mainWindow.hide()}>{this.getIconClose()}</div>
      </div>
    )
  }
}
