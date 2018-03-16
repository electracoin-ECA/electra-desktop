import * as ActionNames from './action-names'
import { GenerateHD, InitialElectra, StartDaemon } from './types'

export function initializeElectra(): InitialElectra {
  return {
    type: ActionNames.INITIALIZE_ELECTRA
  }
}

export function startDaemon(): StartDaemon {
  return {
    type: ActionNames.START_DAEMON
  }
}
export function generateHDWallet(): GenerateHD {
  return {
    type: ActionNames.GENERATE_HARD_WALLET
  }
}
