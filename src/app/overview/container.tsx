import * as React from 'react'
import { DispatchProps } from './types'

const { connect } = require('react-redux')
import { bindActionCreators, Dispatch } from 'redux'

import { getGlobalBalance } from './actions'

// tslint:disable-next-line:typedef
const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps =>
  bindActionCreators({
    getGlobalBalance
// tslint:disable-next-line:align
}, dispatch)

@connect(null, mapDispatchToProps)
export default class Overview extends React.Component {
  public render(): any {
    return (
      <div>Overview</div>
    )
  }
}
