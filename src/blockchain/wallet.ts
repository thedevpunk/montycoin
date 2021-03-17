// import * as crypto from 'crypto';
import Transaction from './transaction';
import Chain from './chain';
import { montyKeyPair } from './keys';
import { JSEncrypt } from 'jsencrypt'; 

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

   sendMoney(amount: number, payeePublicKey: string) {
      const transaction = new Transaction(amount, this.publicKey, payeePublicKey);

      var sign = new JSEncrypt();
      sign.setPrivateKey(this.privateKey);
      var signature = sign.sign($('#input').val(), CryptoJS.SHA256, "sha256");

      // Verify with the public key...
      var verify = new JSEncrypt();
      verify.setPublicKey($('#pubkey').val());
      var verified = verify.verify($('#input').val(), signature, CryptoJS.SHA256);

      transaction.sign(this.publicKey, this.privateKey);

      Chain.instance.addTransaction(transaction);
   }
}

export default Wallet;
