import * as React from 'react'

export default class Toast extends React.Component<any, any> {
  public render(): any {
    const { message, badge } = this.props

    return (
      <div>
        {!!message && !!badge &&
          <div className='c-toast active'>
            <span className='mr-4'>{message}</span>
            <div className='c-badge'>{badge}</div>
          </div>}
      </div>
    )
  }
}
