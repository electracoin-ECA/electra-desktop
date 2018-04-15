import * as React from 'react'
import { Props } from './types'

import './open-iconic.sprite.svg'

export default class Icon extends React.Component<Props, any> {
  public render(): any {
    return (
      <svg
        className={`c-icon c-wallet-info__icon c-icon--size-${Boolean(this.props.size) ? this.props.size : 'xs'}`}
      >
        <use xlinkHref={`#open-iconic.sprite_${this.props.name}`} />
      </svg>
    )
  }
}
