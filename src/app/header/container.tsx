import * as React from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import Utility from '../../utils/common'
import { Icon } from '../icon'
import { getConnectionsCount, getStakingInfo } from './actions'
import { DispatchProps, HeaderState, State, State as Props } from './types'
import { WalletInfo } from './wallet-info'

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

// tslint:disable-next-line:typedef
const mapDispatchToProps = (dispatch: Dispatch<State>): DispatchProps =>
  bindActionCreators({
    getConnectionsCount,
    getStakingInfo
// tslint:disable-next-line:align
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends React.Component<Partial<Props & DispatchProps>, any> {
  public constructor(props: Props & DispatchProps) {
    super(props)
    // tslint:disable-next-line:no-magic-numbers
  }
  public componentDidMount(): void {
    this.triggerIntervalFunction()
  }

  triggerIntervalFunction = (): void => {
    // tslint:disable-next-line:no-magic-numbers
    setInterval(() => {
      const props:DispatchProps = this.props as DispatchProps
      props.getStakingInfo()
      props.getConnectionsCount()
    // tslint:disable-next-line:align
    }, waitTimeInSeconds)
  }

  // tslint:disable-next-line:typedef
  render() {
    const { walletStakingInfo, connectionsCount } = this.props.header as HeaderState
    const { nextRewardIn, networkWeight, weight, staking } = walletStakingInfo
    const isOnline: string = staking ? 'Online' : 'offline'

    return (
      <div className='c-header'>
        <div className='c-header__logo'>
            <img src='assets/logo.svg'></img>
        </div>
        <div className='c-header__content'>
        <div className='c-wallet-info'>
        <Icon name='info-circle' size='xs'></Icon>
          <div className='c-card c-card--rounded-lg w-24 c-wallet-info__card'>
              <div className='c-card__content'>
                <div className='text-xs'>
                  <div className='flex justify-left'>
                    <h3>Wallet Info</h3>
                  </div>
                  <WalletInfo row={rowSix} label={'Staking wallet'} info={`Wallet is currently ${isOnline}`} />
                  <WalletInfo row={rowTwo} label={'Your weight'} info={`${weight}`} />
                  <WalletInfo
                    row={rowTwo}
                    label={'Network weight'}
                    info={`${networkWeight}`}
                  />
                  <WalletInfo
                    row={rowTwo}
                    label={'Downloaded blocks'}
                    info={'143521232'}
                  />
                  <WalletInfo
                    row={rowTwo}
                    label={'Last received block'}
                    info={'143521232'}
                  />
                  <WalletInfo
                    row={rowTwo}
                    label={'Active Connections'}
                    info={`${connectionsCount}`}
                  />
                  <hr />
                  <WalletInfo
                    row={rowTwo}
                    label={'Days until reward'}
                    info={Utility.formatSecondsToOther(nextRewardIn)}
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
