import { JSEncrypt } from 'jsencrypt';
import CryptoJS from 'crypto-js';

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

      const hash = CryptoJS.SHA256(str);

      return CryptoJS.enc.Hex.stringify(hash);

      // const hash = crypto.createHash('SHA256');
      // hash.update(str).end();

      // return hash.digest('hex');
   }

   sign(address: string, key: string) {
      if (this.payer !== address) {
         throw new Error('You cannot sign transactions for other wallets!');
      }

      const hash = this.calcHash();

      var sign = new JSEncrypt({});
      sign.setPrivateKey(key);
      // var signature = sign.sign($('#input').val(), CryptoJS.SHA256, "sha256");
      const signature = sign.sign(hash, (input: string): string => CryptoJS.SHA256(input).toString(), "sha256");

      if (!signature) {
         throw new Error('Error setting the signature!');
      }

      this.signature = signature;

      console.log('transaction signature:', this.signature);
   }

   verify() {
      if (this.payer === '') return true;

      if (this.signature === '') {
         throw new Error('No signature in this transaction!');
      }

      const hash = this.calcHash();

      var verify = new JSEncrypt({});
      verify.setPublicKey(this.payer);

      var isValid = verify.verify(hash, this.signature, (input: string): string => CryptoJS.SHA256(input).toString());

      console.log('signature valid', isValid);

      return isValid;
   }
}

export default Transaction;
