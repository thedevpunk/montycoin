import * as crypto from 'crypto';
import Transaction from './transaction';

class Block {

   constructor(
      public prevHash: string,
      public transactions: Transaction[],
      public timestamp = Date.now()
   ) { }

   public nonce = Math.round(Math.random() * 999999999);
   public hash = this.calcHash();

   calcHash() {
      const str = JSON.stringify(this.prevHash + this.transactions.map(e => e.toString()).join() + this.timestamp.toString() + this.nonce);

      const hash = crypto.createHash('SHA256');
      hash.update(str).end();

      return hash.digest('hex');
   }

   mine(difficulty: number) {
      let solution = 1;

      console.log('⛏ mining...');

      while (true) {
         const hash = crypto.createHash('SHA256');
         hash.update((this.nonce + solution).toString()).end();

         const attempt = hash.digest('hex');

         if (attempt.substr(0, difficulty) === Array(difficulty + 1).join('0')) {
            console.log(`✅ solved: ${solution}`);

            return solution;
         }

         solution += 1;
      }
   }

   verifyTransactions() {
      for (const transaction of this.transactions) {
         if (!transaction.verify()) {
            return false;
         }
      }

      return true;
   }
}

export default Block;
