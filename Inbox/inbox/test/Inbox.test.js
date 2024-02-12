const ganache = require('ganache'); //creates unlock test network (we don't need any pvt or public keys)
const { Web3 } = require('web3'); //constructor function, used to access the unlock accounts created by ganache
const {interface, bytecode} = require('../compile')
// updated ganache and web3 imports added for convenience

// contract test code will go here
const assert = require('assert');
const web3 = new Web3(ganache.provider())

let inbox
let accounts

beforeEach( async ()=>{
    // get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // use one of those accounts to deploy to the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode, 
            arguments: ['Hi there!']
        })
        .send({from: accounts[0], gas: '1000000'})
});

describe('Inbox', ()=>{
    it("It deploys a contract",()=>{
        console.log(inbox)
        assert.ok(inbox.options.address)
    })
    it("It has a default message", async ()=>{
        const message = await inbox.methods.message().call();
        assert.equal(message, "Hi there!")
    })
    it("It can change the message", async ()=>{
        await inbox.methods.setMessage('bye').send({from: accounts[0], gas: '1000000'})
        const message = await inbox.methods.message().call();
        assert.equal(message, "bye")
    })
})