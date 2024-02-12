const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const {interface, bytecode} = require('./compile')

const provider = new HDWalletProvider(
    'banner despair hip lumber quantum brother twenty okay toast print twelve tenant',
    'https://sepolia.infura.io/v3/0b9f3e3c4055407190fff0576da1fa5b'
);
//updated web3 and hdwallet-provider imports added for convenience
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();