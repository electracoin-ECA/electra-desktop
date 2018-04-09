import * as React from 'react'
import { Props } from './types'

import './icons.sprite.svg'

export default class Icon extends React.Component<Props, any> {
  public render(): any {
    const name: string = this.props.name
    const size: string = this.props.size ? this.props.size : 'xs'

    return (
      <svg className={`c-icon c-wallet-info__icon c-icon--size-${size}`}>
        <use xlinkHref={`#icons.sprite_${name}`} />
      </svg>
    )
  }
}
