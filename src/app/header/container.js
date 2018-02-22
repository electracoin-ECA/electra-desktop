import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { WalletInfo } from './wallet-info';

export default class Header extends React.Component {
  render () {
    return (
      <div class='header-container'>
        <div class='logo'>
          <img src='https://cdn.discordapp.com/attachments/414963844587323392/416053920930988032/electra-logo.png'></img>
        </div>
        <div class='wallet-info-container'>
          <WalletInfo label={'Active connections'} info={'294'} />
          <WalletInfo label={'Wallet is currently'} info={'Online'} />
          <WalletInfo label={'Days until staking reward'} info={'13 days'} />
        </div>
      </div>
    )
  }
}
