import { WalletStartDataHard } from 'electra-js'

import { Omit, UserSettings } from './types'

export const USER_SETTINGS_DEFAULT: Omit<UserSettings, keyof WalletStartDataHard> = {
  settings: {
    autoMergeSavingsTransactionsAfterRewards: false,
    autoTeamDonationFromRewards: false,
    autoTeamDonationFromRewardsRatio: 0,
    electraUniversal: false,
    electraUniversalTwitterUsername: null,
  },
  wef: null,
}
