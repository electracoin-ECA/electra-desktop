import * as ActionNames from './action-names'

export function initializeElectra () {
  return {
    type: ActionNames.INITIALIZE_ELECTRA
  }
}

export function generateHDWallt () {
  return {
    type: ActionNames.GENERATE_HARD_WALLET
  }
}
