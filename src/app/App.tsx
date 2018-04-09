// tslint:disable-next-line:no-implicit-dependencies
import { ProgressInfo, UpdateInfo } from 'builder-util-runtime'
import { ipcRenderer } from 'electron'
import * as React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import 'rxjs'

import ElectraJsMiddleware from '../middlewares/ElectraJs'
import { AddressBook } from './addressBook'
import Toast from './common/toast/toast'
import { Header } from './header'
import Loader from './libraries/loader'
import Login from './login'
import { Overview } from './overview'
import { Payments } from './payments'
import { Settings } from './settings'
import { Sidebar } from './sidebar'
import { Transactions } from './transactions'
import { StoreState } from './types'

interface OwnState {
  isLoading: boolean
  isQuitting: boolean
  isUpdating: boolean
  loaderText: string
}

const ONE_SECOND = 1000

class App extends React.Component<StoreState, OwnState> {
  private updateInfo: UpdateInfo

  constructor(props: any) {
    super(props)

    this.state = {
      isLoading: true,
      isQuitting: false,
      isUpdating: false,
      loaderText: '',
    }
  }

  public componentDidMount(): void {
    ipcRenderer.on('ipcMain:autoUpdater:found', this.startAutoUpdate.bind(this))
    ipcRenderer.on('ipcMain:app:quit', () => this.setState({
      isLoading: false,
      isQuitting: true,
      isUpdating: false,
    }))
  }

  private startAutoUpdate(event: any, resString: string): void {
    if (this.state.isQuitting) return
    if (this.state.isLoading) {
      setTimeout(() => this.startAutoUpdate(event, resString), ONE_SECOND)

      return
    }

    ipcRenderer.on('ipcMain:autoUpdater:progress', this.updateDownloadStatus.bind(this))
    ipcRenderer.on('ipcMain:autoUpdater:downloaded', this.installUpdate.bind(this))
    ipcRenderer.send('ipcRenderer:autoUpdater:downloadUpdate')

    this.updateInfo = JSON.parse(resString) as UpdateInfo
    this.setState({
      isLoading: false,
      isUpdating: true,
      loaderText: `Downloading update ${this.updateInfo.version}...`,
    })
  }

  private updateDownloadStatus(event: any, resString: string): void {
    const progressInfo: ProgressInfo = JSON.parse(resString) as ProgressInfo
    this.setState({
      loaderText: `Downloading update ${this.updateInfo.version} (${Math.round(progressInfo.percent)}%)...`,
    })
  }

  private async installUpdate(event: any, resString: string): Promise<void> {
    this.setState({
      isQuitting: true,
      isUpdating: false,
    })
    await ElectraJsMiddleware.wallet.stopDaemon()
    ipcRenderer.send('ipcRenderer:autoUpdater:quitAndInstall')
  }

  public render(): JSX.Element {
    const isReady: boolean = !(this.state.isLoading || this.state.isQuitting || this.state.isUpdating)

    return (
      <Router>
        <div className='c-app-layout'>
          {this.state.isLoading && <Login onDone={(): void => this.setState({ isLoading: false })} />}
          {this.state.isUpdating && <Loader text={this.state.loaderText} />}
          {this.state.isQuitting && <Loader text={'Closing daemon...'} />}

          {isReady && [
            <div key='toolbar' className='c-app-layout__toolbar'>
              <Header />
            </div>,
            <div key='container' className='c-app-layout__container'>
              <aside>
                <Sidebar />
              </aside>
              <main>
                {/* TODO Fix this dirty hack to handle missing redirect on production app. */}
                <Redirect to='/' />
                <Switch>
                  <Route exact path='/' component={Overview} />
                  <Route exact path='/payments' component={Payments} />
                  <Route exact path='/transactions' component={Transactions} />
                  <Route exact path='/address_book' component={AddressBook} />
                  <Route exact path='/settings' component={Settings} />
                </Switch>
                <Toast
                  message={this.props.toast.message}
                  badge={this.props.toast.badge}
                />
              </main>
            </div>,
          ]}
        </div>
      </Router>
    )
  }
}

export default connect<StoreState>((state: StoreState) => ({ ...state }))(App)
