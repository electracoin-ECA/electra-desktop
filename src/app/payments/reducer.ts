import * as ActionNames from './action-names'
import { PaymentsActions, PaymentsState } from './types'

const initialState: PaymentsState = {
  pendingSend: {
    amount: 0,
    to: ''
  }
}

export default function paymentsReducer(state: PaymentsState = initialState, action: PaymentsActions): any {
  switch (action.type) {
    case ActionNames.SET_TO_ADDRESS: {
      return {
        ...state,
        pendingSend: {
            ...state.pendingSend,
            to: action.payload
        }
      }
    }

    case ActionNames.SET_AMOUNT: {
        return {
          ...state,
          pendingSend: {
              ...state.pendingSend,
              amount: action.payload
          }
        }
    }

    case ActionNames.SEND_ECA_SUCCESS: {
        return { ...state }
    }

    case ActionNames.SEND_ECA_FAIL: {
        return { ...state }
    }
    default: return state
  }
}
