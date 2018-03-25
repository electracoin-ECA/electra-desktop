import * as ActionNames from './action-names'
import { PaymentsActions, PaymentsState } from './types'

const initialState: PaymentsState = {
  addresses: [],
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

    case ActionNames.GET_ADDRESSES_SUCCESS: {
      return {
        ...state,
        addresses: action.payload
      }
    }

    case ActionNames.GET_ADDRESSES_FAIL: {
      return { ...state }
    }

    case ActionNames.SEND_ECA_FAIL: {
      return { ...state }
    }

    case ActionNames.CLEAR_SEND_CARD_FIELDS: {
      return { ...initialState }
    }
    default: return state
  }
}
