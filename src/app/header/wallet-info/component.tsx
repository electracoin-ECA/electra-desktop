import * as React from 'react'
import { PropsPartial } from './types'

export default class WalletInfoComponent extends React.Component<PropsPartial, any> {
  // tslint:disable-next-line:typedef
  render() {
    const { label, info, row } = this.props

    return (
      <div className={`block mt-${row}`}>
          <div className='flex'>
            <span className='w-1/2 font-semi-bold'>
              {label}
            </span>
            <span className='w-1/2'>
              {info}
            </span>
            </div>
      </div>
    )
  }
}
