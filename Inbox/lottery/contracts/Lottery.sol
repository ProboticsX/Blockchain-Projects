// SPDX-License-Identifier: MIT
pragma solidity ^0.4.17;
contract Lottery{
    address public manager;
    address[] public players;
    function Lottery() public {
        manager = msg.sender; //msg is a global variable
    }
    function enter() public payable { //payable added to indicate that this function might send some ether along
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }
    function random() private view returns (uint){
        return uint(keccak256(block.difficulty, now, players));
    }
    function pickWinner() public restricted{
        uint index = random()%players.length; // generate random index
        players[index].transfer(this.balance); // transfer the current balance to the winner
        players = new address[](0); //empties the players array after picking the winner
    }
    modifier restricted(){ // modifier is used for writing repetitive logic
        require(msg.sender == manager); // only the manager can pick the winner
        _; // solidity replaces _ with the code
    }
    function getPlayers() public view returns (address[]){
        return players;
    }
}