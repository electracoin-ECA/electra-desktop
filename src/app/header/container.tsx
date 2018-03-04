import * as React from 'react'
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux'
import { WalletInfo } from './wallet-info'
import { getStakingInfo } from './actions'
import Utility from '../../utils/utility'

const mapStateToProps = (state: any) => {
  return {
    walletInfo: state.headerReducer,
    electraJs: state.electraReducer
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    getStakingInfo
  }, dispatch)
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends React.Component<any, any> {

  componentDidMount () {
    this.triggerStakingInfo()
  }

  triggerStakingInfo = () : void => {
    setInterval(() => {
      this.props.getStakingInfo()
    }, 1000 * 5)
  }

  render() {
    const { nextRewardIn } = this.props.walletInfo
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