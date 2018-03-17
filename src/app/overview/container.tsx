import { mapValues } from 'lodash'
import * as React from 'react'
const { connect } = require('react-redux')
import { bindActionCreators, Dispatch } from 'redux'

import { getTransactions } from '../transactions/actions'
import { getCurrentPriceInBTC, getCurrentPriceInUSD, getGlobalBalance } from './actions'
import { DispatchProps, State, State as Props } from './types'

const MAX_DECIMALS: number = 8

// tslint:disable-next-line:typedef
const mapStateToProps = (state: State): Props =>
  ({
    overview: state.overview
  })

// tslint:disable-next-line:typedef
const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps =>
  bindActionCreators({
    getCurrentPriceInBTC,
    getCurrentPriceInUSD,
    getGlobalBalance,
    getTransactions
    // tslint:disable-next-line:align
  }, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class Overview extends React.Component<Props & DispatchProps, any> {
  public componentDidMount(): void {
    this.props.getCurrentPriceInUSD()
    this.props.getCurrentPriceInBTC()
    this.props.getTransactions()
  }

  public render(): any {
    const values: any = mapValues(this.props.overview, (value: string) => parseFloat(value).toFixed(MAX_DECIMALS))
    const ecaInBTC: string = (values.currentPriceBTC * values.globalBalance).toFixed(MAX_DECIMALS)
    const ecaInUSD: string = (values.currentPriceUSD * values.globalBalance).toFixed(MAX_DECIMALS)

    return (
      <div>
        <h3>Overview</h3>
        <div className='c-grid c-grid--thirds py-4'>
          <div className='c-grid__item text-center bg-grey-lightest'>
            <div className='c-card'>
              <div className='c-card__content text-center'>
                <span className='block text-4xl font-extra-bold'>{values.globalBalance}</span>
                <span className='text-grey-light'>&nbsp;</span>
                <span className='block text-lg text-purple font-semi-bold'>ECA</span>
              </div>
            </div>
          </div>
          <div className='c-grid__item text-center bg-grey-lightest'>
            <div className='c-card'>
              <div className='c-card__content text-center'>
                <span className='block text-4xl font-extra-bold'>{ecaInBTC}</span>
                <span className='text-grey-light'>{values.currentPriceBTC}</span>
                <span className='block text-lg text-purple font-semi-bold'>BTC</span>
              </div>
            </div>
          </div>
          <div className='c-grid__item text-center bg-grey-lightest'>
            <div className='c-card'>
              <div className='c-card__content text-center'>
                <span className='block text-4xl font-extra-bold'>{ecaInUSD}</span>
                <span className='text-grey-light'>{values.currentPriceUSD}</span>
                <span className='block text-lg text-purple font-semi-bold'>USD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
