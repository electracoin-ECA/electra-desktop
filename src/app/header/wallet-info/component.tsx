import * as React from 'react'

export default class WalletInfo extends React.Component<any, any> {
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
