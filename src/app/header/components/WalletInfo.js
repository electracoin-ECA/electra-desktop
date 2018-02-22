import React from 'react';
import PropTypes from 'prop-types';

export default class WalletInfo extends React.Component {
  render () {
    const {label, info} = this.props
    return (
      <div>
        <span>{label}</span>
        <span>{info}</span>
      </div>
    )
  }
}
