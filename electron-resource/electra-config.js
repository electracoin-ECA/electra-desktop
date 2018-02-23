const ElectraJs = require('electra-js');

const electraJs = new ElectraJs({
  rpcServerAuth: {
    username: 'user',
    password: 'pass'
  },
  rpcServerUri: 'http://127.0.0.1:5788'
});

module.exports = electraJs;
