import { WalletAddressCategory, WalletTransaction } from 'electra-js'

export interface StateProps {
  transactions: {
    transactions: WalletTransaction[]
  }
}

export interface DispatchProps {
  getTransactions(): GetTransactions,
}

/**
 * action types
 */
export type GET_TRANSACTIONS = 'GET_TRANSACTIONS'
export type GET_TRANSACTIONS_LOOP = 'GET_TRANSACTIONS_LOOP'
export type GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS'
export type GET_TRANSACTIONS_FAIL = 'GET_TRANSACTIONS_FAIL'
export type GET_TRANSACTION = 'GET_TRANSACTION'

/**
 * action interfaces
 */

export interface GetTransaction {
  payload: string,
  type: GET_TRANSACTION
}

export interface GetTransactions {
  payload: WalletAddressCategory | undefined
  type: GET_TRANSACTIONS
}

export interface GetTransactionsLoop {
  payload: WalletAddressCategory | undefined
  type: GET_TRANSACTIONS_LOOP
}

export interface GetTransactionsSuccess {
  type: GET_TRANSACTIONS_SUCCESS,
  payload: WalletTransaction[]
}

export interface GetTransactionsFail {
  type: GET_TRANSACTIONS_FAIL
}

export type TransactionsActions = GetTransactions |
  GetTransaction |
  GetTransactionsSuccess |
  GetTransactionsFail
