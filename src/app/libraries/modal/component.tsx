import * as React from 'react'

const styles: any = require('./styles.css')

interface ComponentProps {
  confirmButtonText: string
  onClose(): void
  onConfirm(): void
  text?: string
  title: string
}

export default class Modal extends React.PureComponent<ComponentProps> {
  public render(): JSX.Element {
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.text}>{this.props.title}</div>
          {this.props.text !== undefined && <div className={styles.text}>{this.props.text}</div>}
          {this.props.children}
          <div>
            <button
              children={'Cancel'}
              onClick={() => this.props.onClose()}
              type={'button'}
            />
            <button
              children={this.props.confirmButtonText}
              onClick={() => this.props.onConfirm()}
              type={'button'}
            />
          </div>
        </div>
      </div>
    )
  }
}
