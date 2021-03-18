import Transaction from './transaction';
import Chain from './chain';
import { montyKeyPair } from './keys';

class Wallet {
   public publicKey: string;
   public privateKey: string;

   constructor() {
      // const keypair = crypto.generateKeyPairSync('rsa', {
      //    modulusLength: 2048,
      //    publicKeyEncoding: { type: 'spki', format: 'pem' },
      //    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
      // });

      this.publicKey = montyKeyPair.publicKey;
      this.privateKey = montyKeyPair.privateKey;
   }

   getPublicKey():string {
      return this.publicKey;
   }

   sendMoney(amount: number, payeePublicKey: string) {
      const transaction = new Transaction(amount, this.publicKey, payeePublicKey);

      transaction.sign(this.publicKey, this.privateKey);

      Chain.instance.addTransaction(transaction);
   }
}

export default Wallet;
