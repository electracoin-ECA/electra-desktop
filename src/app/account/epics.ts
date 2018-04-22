import { WalletBalance, WalletTransaction } from 'electra-js'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'

import ElectraJsMiddleware from '../../middlewares/ElectraJs'
import { AccountCategory, ActionList, ActionType } from './types'

type GetBalanceAndTransactions = [
  AccountCategory,
  number,
  number,
  WalletBalance,
  WalletTransaction[],
  number | undefined
]

const LOOP_DELAY = 2_000
const TRANSACTIONS_COUNT = 10

let currentCategory: AccountCategory

export default {
  getBalanceAndTransactions: (action$: ActionsObservable<ActionList['GET_BALANCE_AND_TRANSACTIONS']>) =>
    action$.ofType(ActionType.GET_BALANCE_AND_TRANSACTIONS)
      .map(async ({ payload: category }: ActionList['GET_BALANCE_AND_TRANSACTIONS']) => Promise.all([
        Promise.resolve(category),
        ElectraJsMiddleware.webServices.getCurrentPriceInBTC('BTC'),
        ElectraJsMiddleware.webServices.getCurrentPriceInUSD(),
        category === null
          ? ElectraJsMiddleware.wallet.getBalance()
          : ElectraJsMiddleware.wallet.getCategoryBalance(category),
        ElectraJsMiddleware.wallet.getTransactions(TRANSACTIONS_COUNT, category === null ? undefined : category),
        // tslint:disable-next-line:no-magic-numbers
        category === 2
          ? ElectraJsMiddleware.wallet.getSavingsCumulatedRewards()
          : Promise.resolve(undefined),
      ]))
      .switchMap((promise: Promise<GetBalanceAndTransactions>) =>
        Observable
          .fromPromise(promise)
          .flatMap(([
            category,
            currentPriceBTC,
            currentPriceUSD,
            balance,
            transactions,
            savingsCumulatedRewards,
          ]: GetBalanceAndTransactions) =>
            category !== currentCategory
              ? []
              : [
                {
                  payload: {category, currentPriceBTC, currentPriceUSD, balance, transactions, savingsCumulatedRewards},
                  type: ActionType.GET_BALANCE_AND_TRANSACTIONS_SUCCESS,
                },
                {
                  payload: category,
                  type: ActionType.GET_BALANCE_AND_TRANSACTIONS_LOOP,
                },
              ],
          )
          .catch((error: Error) => {
            console.error(error.message)

            return Observable.of({
              type: ActionType.GET_BALANCE_AND_TRANSACTIONS_ERROR,
            })
          }),
      ),

  getBalanceAndTransactionsLoop: (action$: ActionsObservable<ActionList['GET_BALANCE_AND_TRANSACTIONS_LOOP']>) =>
    action$.ofType(ActionType.GET_BALANCE_AND_TRANSACTIONS_LOOP)
      .delay(LOOP_DELAY)
      .map(({ payload: category }: ActionList['GET_BALANCE_AND_TRANSACTIONS_LOOP']) => ({
        payload: category,
        type: ActionType.GET_BALANCE_AND_TRANSACTIONS,
      })),

  switchAccountCategory: (action$: ActionsObservable<ActionList['SWITCH_ACCOUNT_CATEGORY']>) =>
    action$.ofType(ActionType.SWITCH_ACCOUNT_CATEGORY)
      .flatMap(({ payload: category }: ActionList['SWITCH_ACCOUNT_CATEGORY']) => {
        currentCategory = category

        return [{
          payload: currentCategory,
          type: ActionType.GET_BALANCE_AND_TRANSACTIONS_LOOP,
        }]
      }),
}
