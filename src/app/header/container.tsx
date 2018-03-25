import * as React from 'react'
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux'
import Utility from '../../utils/common'
import { Icon } from '../icon'
import { getWalletInfo } from './actions'
import { DispatchProps, HeaderState, State, State as Props } from './types'
import { WalletInfoComponent } from './wallet-info'

// tslint:disable-next-line:no-var-requires
const { connect } = require('react-redux')

// tslint:disable-next-line:no-magic-numbers
const waitTimeInSeconds: number = 1000 * 5
const rowTwo: number = 2
const rowSix: number = 6

// tslint:disable-next-line:typedef
const mapStateToProps = (state: State): Props =>
  ({
    electra: state.electra,
    header: state.header
  })

const mapDispatchToProps: ActionCreatorsMapObject[0] = (dispatch: Dispatch<State>): DispatchProps =>
  bindActionCreators({ getWalletInfo }, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends React.Component<Partial<Props & DispatchProps>, any> {
  public componentDidMount(): void {
    this.triggerIntervalFunction()
  }

  public triggerIntervalFunction(): void {
    setInterval((this.props as DispatchProps).getWalletInfo.bind(this), waitTimeInSeconds)
  }

  public render(): JSX.Element {
    const { walletInfo } = this.props.header as HeaderState
    const { connectionsCount,
            localStakingWeight,
            localBlockchainHeight,
            nextStakingRewardIn,
            networkStakingWeight,
            isStaking } = walletInfo
    const isOnline: string = isStaking ? 'Online' : 'Offline'

    return (
      <div className='c-header'>
        <div className='c-header__logo'>
            <img src='assets/logo.svg'></img>
        </div>
        <div className='c-header__content'>
        <div className='c-wallet-info'>
        <Icon name='info-circle' size='l'></Icon>
          <div className='c-card c-card--rounded-lg w-24 c-wallet-info__card'>
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
                    info={`${localBlockchainHeight}`}
                  />
                  <WalletInfoComponent
                    row={rowTwo}
                    label={'Last received block'}
                    info={'asdasd'}
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
      <div className='c-header__user'>
        ((USER-CONTROL))
      </div>
    </div>
    )
  }
}
