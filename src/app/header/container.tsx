import * as React from 'react'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import Utility from '../../utils/common'
import { Icon } from '../libraries/icon'
import { getWalletInfo } from './actions'
import { DispatchProps, StateProps } from './types'
import { WalletInfoComponent } from './wallet-info'

const logo: string = require('./logo.svg')

const GET_WALLET_INFO_INTERVAL = 5000
const rowTwo = 2
const rowSix = 6

const mapStateToProps: MapStateToProps<StateProps, {}, {}> = (state: StateProps): StateProps => ({
    header: state.header,
  })

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> =
  (dispatch: Dispatch<StateProps>): DispatchProps => bindActionCreators({ getWalletInfo }, dispatch)

class Header extends React.Component<StateProps & DispatchProps> {
  componentWillMount(): void {
    this.getWalletInfo()
  }

  getWalletInfo(): void {
    setInterval(this.props.getWalletInfo.bind(this), GET_WALLET_INFO_INTERVAL)
  }

  render(): JSX.Element {
    const {
      connectionsCount,
      lastBlockGeneratedAt,
      localStakingWeight,
      localBlockchainHeight,
      nextStakingRewardIn,
      networkStakingWeight,
      networkBlockchainHeight,
      isStaking,
    } = this.props.header.walletInfo
    const isOnline: string = isStaking ? 'Online' : 'Offline'
    // Need this variable as isSynchonized is not working properly
    const isSynchronized: boolean = Number(localBlockchainHeight) >= networkBlockchainHeight

    return (
      <div className='c-header'>
        <div className='c-header__logo'>
          <img src={logo}></img>
        </div>
        <div className='c-header__content'></div>
        <div className='c-header__user'>
          <div className='c-wallet-info' style={{ padding: 0 }}>
            <Icon name='info-circle' size='l'></Icon>
            <div
              className='c-card c-card--rounded-lg w-24 c-wallet-info__card'
              style={{ left: '-365px', margin: 0, top: '23px' }}
            >
              <div className='c-card__content'>
                <div className='text-xs'>
                  <div className='flex justify-left'>
                    <h3>Wallet Info</h3>
                  </div>
                  <WalletInfoComponent row={rowSix} label={'Staking wallet'} info={`Wallet is currently ${isOnline}`} />
                  <WalletInfoComponent row={rowTwo} label={'Your weight'} info={`${localStakingWeight}`} />
                  <WalletInfoComponent
                    row={rowTwo}
                    label={'Network weight'}
                    info={`${networkStakingWeight}`}
                  />
                  <WalletInfoComponent
                    row={rowTwo}
                    label={'Downloaded blocks'}
                    info={`${localBlockchainHeight} ${isSynchronized ? '(Synced)' : ''}`}
                  />
                  <WalletInfoComponent
                    row={rowTwo}
                    label={'Last received block'}
                    info={String(lastBlockGeneratedAt)}
                  />
                  <WalletInfoComponent
                    row={rowTwo}
                    label={'Active Connections'}
                    info={`${connectionsCount}`}
                  />
                  <hr />
                  <WalletInfoComponent
                    row={rowTwo}
                    label={'Days until reward'}
                    info={Utility.formatSecondsToOther(nextStakingRewardIn)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Header)
