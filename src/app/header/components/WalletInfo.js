import React from 'react';
import PropTypes from 'prop-types';

export default class WalletInfo extends React.Component {
  render () {
    const {label, info} = this.props
    return (
      <div>
        <span>{labelx}</span>
        <span>{info}</span>
      </div>
    )
  }
}

WalletInfo.PropTypes = {
  label: PropTypes.string,
  info: PropTypes.string
}
