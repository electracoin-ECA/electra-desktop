<template>
  <div class="view">
    <h1 class="headline headline--size-l">Send ECA</h1>
    <div class="label label--type-view">
      Available Balance  <span>{{ walletStatus.balance }}</span>
    </div>
    <div class="view-content">
      <div class="form-send-eca">
        <div class="form-row">
          <div class="label label--type-input">
            Recipient
          </div>
          <div class="input">
            <input v-model="recipient" type="text" placeholder="Enter an ECA address">
            <button class="button button--type-secondary disabled">
              <icon icon="clipboard" width="16" height="16"></icon>
            </button>
            <button class="button button--type-secondary disabled">
              <icon icon="book" width="16" height="16"></icon>
            </button>
          </div>
        </div>
        <br>
        <div class="form-row">
          <div class="label label--type-input">
            Description
          </div>
          <div class="input">
            <input type="text" placeholder="Enter a description for this address">
          </div>
        </div>
        <br>
        <div class="form-row">
          <div class="label label--type-input">
            Amount
          </div>
          <div class="input">
            <input v-model="amount" type="number" placeholder="ECA">
          </div>
        </div>
        <br>
        <br>
        <div class="form-row">
          <button class="button button--type-secondary disabled">
            Add Recipient
          </button>
          <button class="button button--type-secondary disabled">
            Reset
          </button>
          <button @click="sendECA(recipient, amount)" class="button button--type-primary" style="float:right">
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '../icons/book'
  import '../icons/clipboard'
  export default {
    data() {
      return {
        recipient: '',
        amount: '',
      }
    },
    computed: {
      walletStatus() {
        return this.$store.getters.walletStatus
      }
    },
    methods: {
      sendECA(address, amount) {
        this.$store.dispatch('send-eca', {
          address,
          amount: parseFloat(amount)
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .form-row
    display block
    width 100%
    
  input + .button
    margin-left 10px
  .button + .button
    margin-left 5px    
</style>