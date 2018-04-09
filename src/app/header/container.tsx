import * as _ from 'lodash'
import * as moment from 'moment'
import * as numeral from 'numeral'
import * as React from 'react'
import { connect } from 'react-redux'

import ElectraJsMiddleware from '../../middlewares/ElectraJs'
import { Icon } from '../libraries/icon'
import { StoreState } from '../types'
import dispatchers from './dispatchers'
import { Dispatchers } from './types'
import { WalletInfoComponent } from './wallet-info'

const logo: string = require('./logo.svg')

const rowTwo = 2
const rowSix = 6

class Header extends React.Component<StoreState & Dispatchers> {
  public componentWillMount(): void {
    this.props.getWalletInfo()
  }

  public render(): JSX.Element {
    const {
      connectionsCount,
      lastBlockGeneratedAt,
      localStakingWeight,
      localBlockchainHeight,
      nextStakingRewardIn,
      networkStakingWeight,
      networkBlockchainHeight,
      isSynchonized,
      isStaking,
    } = this.props.header.walletInfo

    return (
      <div className='c-header'>
        <div className='c-header__logo'>
          <div className='c-wallet-info' style={{ padding: 0 }}>
            <Icon name='info-circle' size='l'></Icon>
            <div className='c-card c-card--rounded-lg w-24 c-wallet-info__card'>
              <div className='c-card__content'>
                <div className='text-xs'>
                  <div className='flex justify-left'>
                    <h3>Wallet Info</h3>
                  </div>
                  <WalletInfoComponent
                    row={rowSix}
                    label={'Status'}
                    info={isStaking ? 'Staking' : 'Not staking'}
                  />
                  <WalletInfoComponent
                    row={rowTwo}
                    label={'Lock'}
                    info={_.capitalize(ElectraJsMiddleware.wallet.lockState)}
                  />
                  <WalletInfoComponent
                    row={rowTwo}
                    label={'Your weight'}
                    info={`${numeral(localStakingWeight).format('0,0')}`}
                  />
                  <WalletInfoComponent
                    row={rowTwo}
                    label={'Network weight'}
                    info={`${numeral(networkStakingWeight).format('0,0')}`}
                  />
                  <WalletInfoComponent
                    row={rowTwo}
                    label={'Downloaded blocks'}
                    info={`
                        ${numeral(localBlockchainHeight).format('0,0')}
                        ${isSynchonized ? '(Synced)' : ` / ${networkBlockchainHeight}`}
                      `}
                  />
                  <WalletInfoComponent
                    row={rowTwo}
                    label={'Last received block'}
                    info={lastBlockGeneratedAt === 0 ? 'Fetching...' : moment.unix(lastBlockGeneratedAt).fromNow()}
                  />
                  <WalletInfoComponent
                    row={rowTwo}
                    label={'Active Connections'}
                    info={`${connectionsCount}`}
                  />
                  <hr />
                  <WalletInfoComponent
                    row={rowTwo}
                    label={'Next reward'}
                    info={nextStakingRewardIn === 0
                      ? 'Fetching...'
                      : nextStakingRewardIn === -1
                        ? 'Never'
                        : _.upperFirst(moment().add(nextStakingRewardIn, 's').fromNow())
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='c-header__content'></div>
        <div className='c-header__logo'>
            <img src={logo}></img>
        </div>
      </div>
    )
  }
}

export default connect<StoreState, Dispatchers, {}>((state: StoreState) => ({ ...state }), dispatchers)(Header)
