import Transaction from './transaction';
import Block from './block';

class Chain {
   public static instance = new Chain();

   chain: Block[];

   constructor(
      public difficulty = 5,
      public pendingTransactions: Transaction[] = [],
      public miningReward = 100
   ) {
      this.chain = [this.generateGenesisBlock()];
   }

   generateGenesisBlock() {
      return new Block('', [new Transaction(0, 'genesis', 'monty')]);
   }

   get lastBlock() {
      return this.chain[this.chain.length - 1];
   }

   minePendingTransactions(miningAwardAddress: string) {
      let block = new Block(this.lastBlock.hash, this.pendingTransactions);
      block.mine(this.difficulty);

      this.chain.push(block);

      this.pendingTransactions = [
         new Transaction(this.miningReward, '', miningAwardAddress)
      ];
   }

   addTransaction(transaction: Transaction) {

      if (!transaction.payer || !transaction.payee) {
         throw new Error('Transaction must include payer and payee!');
      }

      if (!transaction.verify()) {
         throw new Error('Cannot add invalid transactions to chain!');
      }

      this.pendingTransactions.push(transaction);
   }

   getBalance(address: string) {
      let balance = 0;

      
      for (const block of this.chain) {
         for (const transaction of block.transactions) {
            if (transaction.payer === address) {
               balance -= transaction.amount;
            }

            if (transaction.payee == address) {
               balance += transaction.amount;
            }
         }
      }

      return balance;
   }

   isChainValid() {
      for (let i = 1; i < this.chain.length; i++) {
         const currentBlock = this.chain[i];
         const previousBlock = this.chain[i - 1];

         if (!currentBlock.verifyTransactions()) {
            return false;
         }

         if (currentBlock.hash !== currentBlock.calcHash()) {
            return false;
         }

         if (currentBlock.prevHash !== previousBlock.hash) {
            return false;
         }

         return true;
      }
   }
}

export default Chain;
