import * as React from 'react'

import Spinner from '../../shared/spinner'

const styles: any = require('./styles.css')

interface ComponentProps {
  text: string
  subtext?: string
}

export default class Loader extends React.PureComponent<ComponentProps> {
  public render(): JSX.Element {
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <Spinner />
          <div className={styles.textContainer}>
            <p className={styles.text}>{this.props.text}</p>
            <p className={styles.subtext}>{this.props.subtext}</p>
          </div>
        </div>
      </div>
    )
  }
}
