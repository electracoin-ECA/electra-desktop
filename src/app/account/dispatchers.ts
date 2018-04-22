import { AccountCategory, ActionList, ActionType, Dispatchers } from './types'

const dispatchers: Dispatchers = {
  switchAccountCategory: (category: AccountCategory): ActionList['SWITCH_ACCOUNT_CATEGORY'] => ({
    payload: category,
    type: ActionType.SWITCH_ACCOUNT_CATEGORY,
  }),
}

export default dispatchers
