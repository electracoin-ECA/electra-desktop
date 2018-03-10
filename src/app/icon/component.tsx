import * as React from 'react'
import { Props } from './types'
import '../../assets/images/icons/icon-sprite.svg'

export default class Icon extends React.Component<Props, any> {
  // tslint:disable-next-line:typedef
  render() {
    const size = this.props.size || 'md'
    const name = this.props.name
    return (
      <svg className={`c-icon c-icon--size-${size}`}>
        <use xlinkHref={`#icon-sprite_${name}`} />
      </svg>
    )
  }
}