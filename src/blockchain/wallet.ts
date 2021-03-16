import * as crypto from 'crypto';
import Transaction from './transaction';
import Chain from './chain';

class Wallet {
   public publicKey: string;
   public privateKey: string;

   constructor() {
      const keypair = crypto.generateKeyPairSync('rsa', {
         modulusLength: 2048,
         publicKeyEncoding: { type: 'spki', format: 'pem' },
         privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
      });

      this.publicKey = keypair.publicKey;
      this.privateKey = keypair.privateKey;
   }

   sendMoney(amount: number, payeePublicKey: string) {
      const transaction = new Transaction(amount, this.publicKey, payeePublicKey);

      transaction.sign(this.publicKey, this.privateKey);

      Chain.instance.addTransaction(transaction);
   }
}

export default Wallet;
