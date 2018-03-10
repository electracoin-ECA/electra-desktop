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
    const { nextRewardIn } = walletStakingInfo

    return (
      <div className='c-header'>
        <div className='c-header__logo'>
            <img src='assets/logo.svg'></img>
        </div>
        <div className='c-header__content'>
          <WalletInfo label={'Active connections'} info={'294'} />
          <WalletInfo label={'Wallet is currently'} info={'Online'} />
          <WalletInfo label={'Days until staking reward'} info={Utility.formatSecondsToOther(nextRewardIn)} />
        </div>
        <div className='c-header__user'>
            ((USER-CONTROL))
        </div>
      </div>
    )
  }
}
