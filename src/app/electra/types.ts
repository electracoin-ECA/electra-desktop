
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
  by?: string,
  payload?: any
}

export interface InitializeElectraFail {
  type: INITIALIZE_ELECTRA_FAIL,
  by?: string,
  payload?: any
}

export interface InitializeElectraSuccess {
  type: INITIALIZE_ELECTRA_SUCCESS,
  by?: string,
  payload?: any
}

export interface GenerateHD {
  type: GENERATE_HARD_WALLET,
  by?: string,
  payload?: any
}

export interface GenerateHDFail {
  type: GENERATE_HARD_WALLET_FAIL,
  by?: string,
  payload?: any
}

export interface GenerateHDSuccess {
  type: GENERATE_HARD_WALLET_SUCCESS,
  by?: string,
  payload?: any
}

export type ElectraActions = InitialElectra|
                            InitializeElectraFail|
                            InitializeElectraSuccess |
                            GenerateHD |
                            GenerateHDFail |
                            GenerateHDSuccess
