import { WalletStartDataHard } from 'electra-js'
import * as uuid from 'uuid'

import { Omit, UserSettings } from './types'

export const USER_SETTINGS_DEFAULT: Omit<UserSettings, keyof WalletStartDataHard> = {
  appId: uuid.v4(),
  settings: {
    apiToken: '',
    autoMergeSavingsTransactionsAfterRewards: false,
    autoTeamDonationFromRewards: false,
    autoTeamDonationFromRewardsRatio: 0,
    autoUpdate: true,
    electraUniverseTwitterUsername: '',
    synchronizeSettings: false,
  },
}
