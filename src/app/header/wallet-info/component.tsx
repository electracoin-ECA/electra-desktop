import * as React from 'react'

export default class WalletInfo extends React.Component<any, any> {
  render() {
    const { label, info } = this.props
    return (
      <div>
        <span>{`${label}: ${info}`}</span>
      </div>
    )
  }
}
