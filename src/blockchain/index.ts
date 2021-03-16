import Wallet from './wallet';
import Chain from './chain';

const monty = new Wallet();
const bob = new Wallet();
const alice = new Wallet();


monty.sendMoney(100, bob.publicKey);
console.log(Chain.instance);

Chain.instance.minePendingTransactions(alice.publicKey);
console.log(Chain.instance);

Chain.instance.minePendingTransactions(monty.publicKey);
console.log(Chain.instance);

console.log(`Monty's balance: ${Chain.instance.getBalance(monty.publicKey)}`);
console.log(`Bobs balance: ${Chain.instance.getBalance(bob.publicKey)}`);
console.log(`Alice's balance: ${Chain.instance.getBalance(alice.publicKey)}`);