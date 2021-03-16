import * as crypto from 'crypto';

class Transaction {
   constructor(
      public amount: number,
      public payer: string,
      public payee: string
   ) { }

   public signature: string = '';

   toString() {
      return JSON.stringify(this);
   }

   calcHash() {
      const str = JSON.stringify(this.amount + this.payer + this.payee);

      const hash = crypto.createHash('SHA256');
      hash.update(str).end();

      return hash.digest('hex');
   }

   sign(address: string, key: string) {
      if (this.payer !== address) {
         throw new Error('You cannot sign transactions for other wallets!');
      }

      const hash = this.calcHash();

      const sign = crypto.createSign('SHA256');
      sign.update(hash).end();

      this.signature = sign.sign(key).toString('hex');
   }

   verify() {
      if (this.payer === '') return true;

      if (this.signature === '') {
         throw new Error('No signature in this transaction!');
      }

      const hash = this.calcHash();

      const verifier = crypto.createVerify('SHA256');
      verifier.update(hash);

      const isValid = verifier.verify(this.payer, this.signature, 'hex');

      return isValid;
   }
}

export default Transaction;
