import { WalletStartDataHard } from 'electra-js'

export type Diff<T extends string, U extends string> = ({[P in T]: P } & {[P in U]: never } & { [x: string]: never })[T]
export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>

export interface UserSettings extends WalletStartDataHard {
  settings: {
    autoMergeSavingsTransactionsAfterRewards: boolean
    autoTeamDonationFromRewards: boolean
    autoTeamDonationFromRewardsRatio: number
    autoUpdate: boolean
    electraUniverse: boolean
    electraUniverseTwitterUsername: string
  }
}
