import * as React from 'react'
import { DispatchProps } from './types'

const { connect } = require('react-redux')
import { bindActionCreators, Dispatch } from 'redux'

import { getCurrentPriceInBTC, getCurrentPriceInUSD } from './actions'

// tslint:disable-next-line:typedef
const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps =>
  bindActionCreators({
    getCurrentPriceInBTC,
    getCurrentPriceInUSD
// tslint:disable-next-line:align
}, dispatch)

@connect(null, mapDispatchToProps)
export default class Overview extends React.Component<DispatchProps, any> {
  componentDidMount(): void {
    this.props.getCurrentPriceInUSD()
    this.props.getCurrentPriceInBTC()
  }

  public render(): any {
    return (
      <div>Overview</div>
    )
  }
}
