import * as React from 'react'

export default class WalletInfo extends React.Component<any, any> {
  // tslint:disable-next-line:typedef
  render() {
    const { label, info } = this.props

    return (
      <div>
        <span>{`${label}: ${info}`}</span>
      </div>
    )
  }
}
