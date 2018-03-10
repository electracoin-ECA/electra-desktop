import * as ActionNames from './action-names'
import { GenerateHD, InitialElectra } from './types'

export function initializeElectra(): InitialElectra {
  return {
    type: ActionNames.INITIALIZE_ELECTRA
  }
}

export function generateHDWallet(): GenerateHD {
  return {
    type: ActionNames.GENERATE_HARD_WALLET
  }
}
