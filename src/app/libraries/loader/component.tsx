import * as React from 'react'

import Spinner from '../../libraries/spinner'

const styles: any = require('./styles.css')

interface ComponentProps {
  text: string
}

export default class Loader extends React.PureComponent<ComponentProps> {
  public render(): JSX.Element {
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <Spinner />
          <p className={styles.text}>{this.props.text}</p>
        </div>
      </div>
    )
  }
}
