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
    blocks: 0,
    currentblocksize: 0,
    netstakeweight: 0,
    stakeweight: {
      minimum: 0,
      maximum: 0,
      combined: 0
    }
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
  transactions: state => state.transactions
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
            stake: info.stake,
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
      .exec('getmininginfo', (err, info) => {
        if (err) {
          console.error(err)
        } else {
          const stakingStatus = {
            blocks: info.blocks,
            currentblocksize: info.currentblocksize,
            netstakeweight: info.netstakeweight,
            stakeweight: {
              minimum: info.stakeweight.minimum,
              maximum: info.stakeweight.maximum,
              combined: info.stakeweight.combined
            }
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