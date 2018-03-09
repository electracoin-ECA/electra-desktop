import * as React from 'react'
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux'

import { OverviewActions } from './index'

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    getGlobalBalance: OverviewActions.getGlobalBalance
  }, dispatch)
}

@connect(null, mapDispatchToProps)
export default class Overview extends React.Component<any, any> {
  componentWillMount() {
    this.props.getGlobalBalance() // get global balance
  }

  render() {
    return (
      <div>Overview</div>
    )
  }
}
