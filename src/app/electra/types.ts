

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

 /**
  * Initialize electra
  */
export type INITIALIZE_ELECTRA = 'INITIALIZE_ELECTRA'
export type INITIALIZE_ELECTRA_FAIL = 'INITIALIZE_ELECTRA_FAIL'
export type INITIALIZE_ELECTRA_SUCCESS = 'INITIALIZE_ELECTRA_SUCCESS'

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

/**
 * Generate wallet
 */
export type GENERATE_HARD_WALLET = 'GENERATE_HARD_WALLET'
export type GENERATE_HARD_WALLET_SUCCESS = 'GENERATE_HARD_WALLET_SUCCESS'
export type GENERATE_HARD_WALLET_FAIL = 'GENERATE_HARD_WALLET_FAIL'

export interface GenerateHD {
  type: GENERATE_HARD_WALLET,
}

export interface GenerateHDFail {
  type: GENERATE_HARD_WALLET_FAIL,
}

export interface GenerateHDSuccess {
  type: GENERATE_HARD_WALLET_SUCCESS,
}

/**
 * Start daemon
 */

export type START_DAEMON = 'START_DAEMON'
export type START_DAEMON_FAIL = 'START_DAEMON_FAIL'
export type START_DAEMON_SUCCESS = 'START_DAEMON_SUCCESS'

export interface StartDaemon {
  type: START_DAEMON
}

export interface StartDaemonFail {
  type: START_DAEMON_FAIL
}

export interface StartDaemonSuccess {
  type: START_DAEMON_SUCCESS
}

/**
 * STOP daemon
 */

export type STOP_DAEMON = 'STOP_DAEMON'
export type STOP_DAEMON_FAIL = 'STOP_DAEMON_FAIL'
export type STOP_DAEMON_SUCCESS = 'STOP_DAEMON_SUCCESS'

export interface StopDaemon {
  type: STOP_DAEMON
}

export interface StopDaemonFail {
  type: STOP_DAEMON_FAIL
}

export interface StopDaemonSuccess {
  type: STOP_DAEMON_SUCCESS
}

export type ElectraActions = InitialElectra|
                            InitializeElectraFail|
                            InitializeElectraSuccess |
                            GenerateHD |
                            GenerateHDFail |
                            GenerateHDSuccess |
                            StartDaemon |
                            StartDaemonFail |
                            StartDaemonSuccess |
                            StopDaemon |
                            StopDaemonFail |
                            StopDaemonSuccess
