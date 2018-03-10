import * as React from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import Utility from '../../utils/utility'
import { getStakingInfo } from './actions'
import { DispatchProps, Props, State } from './types'
import { WalletInfo } from './wallet-info'

// tslint:disable-next-line:no-var-requires
const { connect } = require('react-redux')

// tslint:disable-next-line:typedef
const mapStateToProps = (state: State): Props =>
({
  electra: state.electra,
  walletInfo: state.header
})

// tslint:disable-next-line:typedef
const mapDispatchToProps = (dispatch: Dispatch<State>): DispatchProps =>
  bindActionCreators({
  getStakingInfo
// tslint:disable-next-line:align
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends React.Component<any, any> {

  // tslint:disable-next-line:typedef
  componentDidMount() {
    this.triggerStakingInfo()
  }

  triggerStakingInfo = () : void => {
    setInterval(() => {
      this.props.getStakingInfo()
    // tslint:disable-next-line:no-magic-numbers
    },          1000 * 5)
  }
  // tslint:disable-next-line:typedef
  render() {
    const { walletStakingInfo } = this.props.walletInfo
    const { nextRewardIn, networkWeight, weight, staking } = walletStakingInfo
    const isOnline: string = staking ? 'Online' : 'offline'
    const rowTwo: number = 2
    const rowSix: number = 6

    return (
      <div className='c-header'>
        <div className='c-header__logo'>
            <img src='assets/logo.svg'></img>
        </div>
        <div className='c-header__content'>
        <div className='c-wallet-info'>
          <svg className='c-icon c-wallet-info__icon'>
              <use xlinkHref='#info-circle' />
          </svg>
          <div className='c-card c-card--rounded-lg w-24 c-wallet-info__card'>
              <div className='c-card__content'>
                <div className='text-xs'>
                  <div className='flex justify-center'>
                      <h3>Wallet</h3>
                      <h3 className='ml-10 text-purple'>Staking</h3>
                  </div>
                  <WalletInfo row={rowSix} label={'Staking wallet'} info={`Wallet is currently ${isOnline}`} />
                  <WalletInfo row={rowTwo} label={'Your weight'} info={weight} />
                  <WalletInfo
                    row={rowTwo}
                    label={'Network weight'}
                    info={networkWeight}
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
