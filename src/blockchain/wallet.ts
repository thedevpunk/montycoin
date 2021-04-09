import Transaction from './transaction';
import Chain from './chain';
import { montyKeyPair } from './keys';
<<<<<<< HEAD
import { JSEncrypt } from 'jsencrypt';
// import CryptoJS from 'crypto-js';
import sha256 from 'crypto-js/sha256';
=======
>>>>>>> 03997fa153c896f113023ea64ab1ff56877cc872

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

<<<<<<< HEAD
      var sign = new JSEncrypt({});
      sign.setPrivateKey(this.privateKey);
      var signature = sign.sign(transaction.toString(), (e) => sha256(e).toString(), "sha256");

      if(!signature) {
         throw new Error('signature not correct');
      }

      // Verify with the public key...
      var verify = new JSEncrypt({});
      verify.setPublicKey(this.publicKey);
      var verified = verify.verify(transaction.toString(), signature, (e) => sha256(e).toString());

=======
>>>>>>> 03997fa153c896f113023ea64ab1ff56877cc872
      transaction.sign(this.publicKey, this.privateKey);

      Chain.instance.addTransaction(transaction);
   }
}

export default Wallet;
