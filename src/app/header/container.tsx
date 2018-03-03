import * as React from 'react'
const { connect } = require('react-redux');
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
      <div className='header-container'>
        <div className='logo'>
          <img src='https://cdn.discordapp.com/attachments/414963844587323392/416053920930988032/electra-logo.png'></img>
        </div>
        <div className='wallet-info-container'>
          <WalletInfo label={'Active connections'} info={'294'} />
          <WalletInfo label={'Wallet is currently'} info={'Online'} />
          <WalletInfo label={'Days until staking reward'} info={Utility.formatNextRewardInValue(nextRewardIn)} />
        </div>
      </div>
    )
  }
}
