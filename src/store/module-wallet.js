import { rpcConfig } from '../config'
const rpc = require('kapitalize')()

rpc
  .auth(rpcConfig.user, rpcConfig.password)
  .set({
    port: rpcConfig.port
  })

// initial state
const state = {
  walletStatus: {
    balance: 0,
    stake: 0
  },
  networkStatus: {
    ip: '',
    connections: 0,
    blocks: 0,
    keypoololdest: 0,
    keypoolsize: 0,
    moneysupply: 0
  },
  stakingStatus: {
    enabled: false,
    staking: false,
    blocks: 0,
    currentblocksize: 0,
    weight: 0,
    netstakeweight: 0,
    expectedtime: null
  },
  transactions: []
}

const mutations = {
  SET_WALLET_STATUS (state, status) {
    state.walletStatus = status
  },
  SET_NETWORK_STATUS (state, status) {
    state.networkStatus = status
  },
  SET_STAKING_STATUS (state, status) {
    state.stakingStatus = status
  },
  SET_TRANSACTIONS (state, txs) {
    state.transactions = txs
  },
  SET_ERROR (state, error) {
    state.error = error
  }
}

const getters = {
  walletStatus: state => state.walletStatus,
  networkStatus: state => state.networkStatus,
  stakingStatus: state => state.stakingStatus,
  transactions: state => state.transactions,
  expectedTime: state => state.stakingStatus.expectedtime
}

const actions = {
  'update-wallet-state' (module) {
    rpc
      .getInfo((err, info) => {
        if (err) {
          console.error(err)
          module.commit('SET_ERROR', {
            type: 'connection',
            description: err
          })
        } else {
          const walletStatus = {
            balance: info.balance,
            stake: info.stake
          }
          const networkStatus = {
            ip: info.ip,
            connections: info.connections,
            blocks: info.blocks,
            keypoololdest: info.keypoololdest,
            keypoolsize: info.keypoolsize,
            moneysupply: info.moneysupply
          }
          module.commit('SET_WALLET_STATUS', walletStatus)
          module.commit('SET_NETWORK_STATUS', networkStatus)
        }
      })
  },
  'update-staking-state' (module) {
    rpc
      .exec('getstakinginfo', (err, info) => {
        if (err) {
          console.error(err)
        } else {
          const stakingStatus = {
            enabled: info.enabled,
            staking: info.staking,
            blocks: info.blocks,
            currentblocksize: info.currentblocksize,
            weight: info.weight,
            netstakeweight: info.netstakeweight,
            expectedtime: info.expectedtime
          }
          module.commit('SET_STAKING_STATUS', stakingStatus)
        }
      })
  },
  'update-transactions' (module) {
    rpc
      .exec('listtransactions', (err, txs) => {
        if (err) {
          console.error(err)
        } else {
          module.commit('SET_TRANSACTIONS', txs)
        }
      })
  },
  'send-eca' (module, { address, amount }) {
    let amtStr = amount.toFixed(4)
    let amt = Number(amtStr)
    rpc
      .sendtoaddress(address, amt, (err, txid) => {
        if (err) {
          console.log(err)
        } else {
          console.log(txid)
        }
      })
  }
}

const plugins = []

export default {
  state,
  mutations,
  getters,
  actions,
  plugins
}
