import * as React from 'react'

import SpinnerAnimation from './spinner-animation'

const styles: any = require('./styles.css')

export default function Spinner(): JSX.Element {
  return (
    <div className={styles.container}>
      <SpinnerAnimation />
    </div>
  )
}
