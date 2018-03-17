import { WalletTransaction } from 'electra-js/dist/wallet/types'

export interface State {
    transactions: WalletTransaction[]
}

/**
 * action types
 */
export type GET_TRANSACTIONS = 'GET_TRANSACTIONS'
export type GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS'
export type GET_TRANSACTIONS_FAIL = 'GET_TRANSACTIONS_FAIL'

/**
 * action interfaces
 */
export interface GetTransactions {
    type: GET_TRANSACTIONS
}

export interface GetTransactionsSuccess {
    type: GET_TRANSACTIONS_SUCCESS,
    payload: WalletTransaction[]
}

export interface GetTransactionsFail {
    type: GET_TRANSACTIONS_FAIL
}

export type TransactionsActions =   GetTransactions |
                                    GetTransactionsSuccess |
                                    GetTransactionsFail