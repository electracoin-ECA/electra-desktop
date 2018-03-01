import * as ActionNames from './action-names'

const initialState = {
	networkWeight: null,
	nextRewardIn: null,
	weight: null
}

export default function (state = initialState, action) {
	switch (action.type) {
		case ActionNames.RECEIVED_STAKING_INFO: {
			const {networkWeight, nextRewardIn, weight} = action.payload
			return {
				...state,
				networkWeight,
				nextRewardIn,
				weight
			}
		}
		case ActionNames.FAILED_TO_RETRIEVE_STAKING_INFO: {
			return {
				...state,
				something: true
			}
		}
		default:
			return state
	}
}
