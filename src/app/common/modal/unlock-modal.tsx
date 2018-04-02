import to from 'await-to-js'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import * as React from 'react'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { setMessageAndBadge } from '../../common/toast/actions'
import { PENDING, SENDING_IN_PROGRESS } from '../../common/toast/toast-messages'
import { clearSendCardFields, sendEca } from '../../payments/actions'
import { setOpened, setUnlocked } from './actions'
import { DispatchProps, StateProps } from './types'

const mapStateToProps: MapStateToProps<StateProps, {}, {}> = (state: StateProps): StateProps => ({
  modal: state.modal,
  payments: state.payments
})

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> =
(dispatch: Dispatch<StateProps>): DispatchProps => bindActionCreators({
  clearSendCardFields,
  sendEca,
  setMessageAndBadge,
  setOpened,
  setUnlocked
}, dispatch)

class UnlockModal extends React.Component<StateProps & DispatchProps, any> {
  constructor(props: StateProps & DispatchProps) {
    super(props)

    this.state = { passphrase: '' }
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.setPassphrase = this.setPassphrase.bind(this)
  }

  setPassphrase(value: any): void {
    this.setState({ passphrase: value.target.value })
  }

  handleOpen(): void {
    this.props.setOpened(true)
  }

  handleClose(): void {
    this.props.setOpened(false)
  }

  async validatePassphrase(passphrase: string): Promise<void> {
    const [error] = await to(this.props.setUnlocked(passphrase))
    if (error) {
      return
    }

    this.props.setOpened(false)
    const { pendingSend } = this.props.payments
    this.props.sendEca(pendingSend.amount, pendingSend.to)
    this.props.clearSendCardFields()
    this.props.setMessageAndBadge(SENDING_IN_PROGRESS, PENDING)
  }

  public render(): JSX.Element {
    const { opened, message, title } = this.props.modal
    const actions: JSX.Element[] = [
      <button onClick={(): Promise<void> => this.validatePassphrase(this.state.passphrase)}>Ok</button>
    ]

    return (
      <div>
        <Dialog
          title={title}
          modal={false}
          actions={actions}
          open={opened}
          style={{ textAlign: 'center' }}
          onRequestClose={this.handleClose}>
          <p>{message}</p>
          <TextField hintText='Passphrase' onChange={this.setPassphrase} />
        </Dialog>
      </div>
    )
  }
}

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(UnlockModal)
