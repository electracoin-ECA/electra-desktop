import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { WalletInfo } from './wallet-info'
import { getStakingInfo } from './actions'

const mapStateToProps = (state) => {
  return {
    ...state.networkWeight,
    electraJs: state.electraReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getStakingInfo
  }, dispatch)
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends React.Component {

  componentDidMount() {
    this.props.getStakingInfo()
    this.triggerFetchInfo()
  }

  // componentDidUpdate () {
  //   console.log('did update')
  //   this.triggerFetchInfo()
  // }
  triggerFetchInfo () {
    setInterval(() => { this.props.getStakingInfo() }, 1000 * 5)
  }
  render () {
    const { networkWeight, weight, nextRewardIn } = this.props
    return (
      <div class='header-container'>
        <div class='logo'>
          <img src='https://cdn.discordapp.com/attachments/414963844587323392/416053920930988032/electra-logo.png'></img>
        </div>
        <div class='wallet-info-container'>
          <WalletInfo label={'Active connections'} info={'294'} />
          <WalletInfo label={'Wallet is currently'} info={'Online'} />
          <WalletInfo label={'Days until staking reward'} info={nextRewardIn} />
        </div>
      </div>
    )
  }
}
