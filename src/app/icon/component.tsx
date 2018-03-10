import * as React from 'react'
import '../../assets/images/icons/icon-sprite.svg'
import { Props } from './types'

export default class Icon extends React.Component<Props, any> {
  static defaultProps: Props = {
    size: 'xs'
  }
  // tslint:disable-next-line:typedef
  render() {
    const { name, size } = this.props

    return (
      <svg className={`c-icon c-icon--size-${size}`}>
        <use xlinkHref={`#icon-sprite_${name}`} />
      </svg>
    )
  }
}
