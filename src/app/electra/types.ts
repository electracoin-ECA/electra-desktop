
export interface ElectraState {
  electraJs: any
}

export interface RpcServerAuth {
  username: string,
  password: string
}

export interface Config {
  rpcServerAuth: RpcServerAuth,
  rpcServerUri: string
}

/**
 * action types
 */

export type INITIALIZE_ELECTRA = 'INITIALIZE_ELECTRA'
export type INITIALIZE_ELECTRA_FAIL = 'INITIALIZE_ELECTRA_FAIL'
export type INITIALIZE_ELECTRA_SUCCESS = 'INITIALIZE_ELECTRA_SUCCESS'

export type GENERATE_HARD_WALLET = 'GENERATE_HARD_WALLET'
export type GENERATE_HARD_WALLET_SUCCESS = 'GENERATE_HARD_WALLET_SUCCESS'
export type GENERATE_HARD_WALLET_FAIL = 'GENERATE_HARD_WALLET_FAIL'

export interface InitialElectra {
  type: INITIALIZE_ELECTRA,
}

export interface InitializeElectraFail {
  type: INITIALIZE_ELECTRA_FAIL,
}

export interface InitializeElectraSuccess {
  type: INITIALIZE_ELECTRA_SUCCESS,
  payload: any
}

export interface GenerateHD {
  type: GENERATE_HARD_WALLET,
}

export interface GenerateHDFail {
  type: GENERATE_HARD_WALLET_FAIL,
}

export interface GenerateHDSuccess {
  type: GENERATE_HARD_WALLET_SUCCESS,
}

export type ElectraActions = InitialElectra|
                            InitializeElectraFail|
                            InitializeElectraSuccess |
                            GenerateHD |
                            GenerateHDFail |
                            GenerateHDSuccess
