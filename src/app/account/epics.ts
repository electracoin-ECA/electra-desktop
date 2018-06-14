import { CurrencyPrice, WalletBalance, WalletTransaction } from 'electra-js'
import { ActionsObservable, ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, delay, flatMap, map, switchMap } from 'rxjs/operators'

import ElectraJsMiddleware from '../../middlewares/ElectraJs'
import { ActionType as SettingsActionType } from '../settings/types'
import { AccountCategory, ActionList, ActionType } from './types'

type GetBalanceAndTransactions = [
  AccountCategory,
  CurrencyPrice,
  WalletBalance,
  WalletTransaction[],
  number | undefined
]

const LOOP_DELAY = 2_000
const TRANSACTIONS_COUNT = 10

let currentCategory: AccountCategory
let isLooping = true

export default {
  getBalanceAndTransactions: (action$: ActionsObservable<ActionList['GET_BALANCE_AND_TRANSACTIONS']>) =>
    action$.pipe(
      ofType(ActionType.GET_BALANCE_AND_TRANSACTIONS),
      map(async ({ payload: category }: ActionList['GET_BALANCE_AND_TRANSACTIONS']) => Promise.all([
        Promise.resolve(category),
        ElectraJsMiddleware.webServices.getCurrentPriceIn(),
        category === null
          ? ElectraJsMiddleware.wallet.getBalance()
          : ElectraJsMiddleware.wallet.getCategoryBalance(category),
        ElectraJsMiddleware.wallet.getTransactions(TRANSACTIONS_COUNT, category === null ? undefined : category),
        // tslint:disable-next-line:no-magic-numbers
        category === 2
          ? ElectraJsMiddleware.wallet.getSavingsCumulatedRewards()
          : Promise.resolve(undefined),
      ])),
      switchMap((promise: Promise<GetBalanceAndTransactions>) =>
        from(promise).pipe(
          flatMap(([
            category,
            currentPrices,
            balance,
            transactions,
            savingsCumulatedRewards,
          ]: GetBalanceAndTransactions) =>
            category !== currentCategory
              ? []
              : [
                {
                  payload: {
                    balance,
                    category,
                    currentPriceBTC: currentPrices.priceInBtc,
                    currentPriceUSD: currentPrices.price,
                    savingsCumulatedRewards,
                    transactions,
                  },
                  type: ActionType.GET_BALANCE_AND_TRANSACTIONS_SUCCESS,
                },
                {
                  payload: category,
                  type: ActionType.GET_BALANCE_AND_TRANSACTIONS_LOOP,
                },
              ],
          ),
          catchError((error: Error) => {
            console.error(error.message)

            return of({
              type: ActionType.GET_BALANCE_AND_TRANSACTIONS_ERROR,
            })
          }),
        ),
      ),
    ),

  getBalanceAndTransactionsLoop: (action$: ActionsObservable<ActionList['GET_BALANCE_AND_TRANSACTIONS_LOOP']>) =>
    action$.pipe(
      ofType(ActionType.GET_BALANCE_AND_TRANSACTIONS_LOOP),
      delay(LOOP_DELAY),
      map(({ payload: category }: ActionList['GET_BALANCE_AND_TRANSACTIONS_LOOP']) => isLooping
        ? {
          payload: category,
          type: ActionType.GET_BALANCE_AND_TRANSACTIONS,
        }
        : { type: 'VOID' },
      ),
    ),

  switchAccountCategory: (action$: ActionsObservable<ActionList['SWITCH_ACCOUNT_CATEGORY']>) =>
    action$.pipe(
      ofType(ActionType.SWITCH_ACCOUNT_CATEGORY),
      flatMap(({ payload: category }: ActionList['SWITCH_ACCOUNT_CATEGORY']) => {
        currentCategory = category

        return [{
          payload: currentCategory,
          type: ActionType.GET_BALANCE_AND_TRANSACTIONS_LOOP,
        }]
      }),
    ),

  stopWalletInfoLoop: (action$: ActionsObservable<{ type: 'STOP_LOOP_CALLS' }>) =>
    action$.pipe(
      ofType(SettingsActionType.STOP_LOOP_CALLS),
      map(() => {
        isLooping = false

        return { type: 'VOID' }
      }),
    ),
}
