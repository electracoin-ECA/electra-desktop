import accountEpics from './epics'
import AccountChecking from './parents/checking'
import AccountLegacy from './parents/legacy'
import AccountOverview from './parents/overview'
import AccountPurse from './parents/purse'
import AccountSavings from './parents/savings'
import accountReducer from './reducer'

export {
  AccountChecking,
  AccountLegacy,
  AccountOverview,
  AccountPurse,
  AccountSavings,
  accountEpics,
  accountReducer,
}
