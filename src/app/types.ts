import { State as UnlockModalState } from './common/unlock-modal/types'
import { State as PaymentsState } from './payments/types'

export interface ActionBase<ActionType extends string> {
  type: ActionType
}
export interface ActionBaseWithPayload<ActionType extends string, Payload> {
  type: ActionType
  payload: Payload
}

export type ActionBaseList<ActionType extends string> = {
  [Key in ActionType]: ActionBase<Key>
}

export type ActionBaseWithPayloadList<ActionType extends string> = {
  [Key in ActionType]?: ActionBaseWithPayload<Key, any>
}

export type ActionListGenerator<
  ActionType extends string,
  ActionsWithPayload extends ActionBaseWithPayloadList<ActionType>
  > = ActionBaseList<ActionType> & ActionsWithPayload

export interface StoreState {
  payments: PaymentsState
  unlockModal: UnlockModalState
}
