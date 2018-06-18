import { WalletAddressCategory, WalletBalance, WalletTransaction } from 'electra-js'

import { ActionBaseWithPayload, ActionListGenerator } from '../types'

/*
 * State
 */
export interface State {
  currentPriceBTC: number
  currentPriceUSD: number
  confirmedBalance: number
  isLoading: boolean
  savingsCumulatedRewards?: number
  transactions: WalletTransaction[]
  unconfirmedBalance: number
}

/*
 * Dispatchers
 */
export interface Dispatchers {
  switchAccountCategory(category: AccountCategory): ActionList['SWITCH_ACCOUNT_CATEGORY']
}

/**
 * Properties
 */
export interface OwnProps {
  category: AccountCategory
}

/*
 * Actions
 */
export enum ActionType {
  GET_BALANCE_AND_TRANSACTIONS = 'GET_BALANCE_AND_TRANSACTIONS',
  GET_BALANCE_AND_TRANSACTIONS_ERROR = 'GET_BALANCE_AND_TRANSACTIONS_ERROR',
  GET_BALANCE_AND_TRANSACTIONS_LOOP = 'GET_BALANCE_AND_TRANSACTIONS_LOOP',
  GET_BALANCE_AND_TRANSACTIONS_SUCCESS = 'GET_BALANCE_AND_TRANSACTIONS_SUCCESS',
  SWITCH_ACCOUNT_CATEGORY = 'SWITCH_ACCOUNT_CATEGORY',
}

export type ActionList = ActionListGenerator<ActionType, {
  GET_BALANCE_AND_TRANSACTIONS: ActionBaseWithPayload<ActionType.GET_BALANCE_AND_TRANSACTIONS, AccountCategory>
  GET_BALANCE_AND_TRANSACTIONS_LOOP: ActionBaseWithPayload<
    ActionType.GET_BALANCE_AND_TRANSACTIONS_LOOP,
    AccountCategory
  >
  GET_BALANCE_AND_TRANSACTIONS_SUCCESS: ActionBaseWithPayload<
    ActionType.GET_BALANCE_AND_TRANSACTIONS_SUCCESS,
    {
      balance: WalletBalance
      category: AccountCategory
      currentPriceBTC: number
      currentPriceUSD: number
      savingsCumulatedRewards: number | undefined
      transactions: WalletTransaction[]
    }
  >
  SWITCH_ACCOUNT_CATEGORY: ActionBaseWithPayload<ActionType.SWITCH_ACCOUNT_CATEGORY, AccountCategory>
}>

/*
 * Custom types
 */

export type AccountCategory = WalletAddressCategory | null
