import React, { useEffect, useState } from 'react';
import Wallet from '../blockchain/wallet';

const createWallets = (): Wallet[] => {
   const wallets = [];
   wallets.push(new Wallet());
   wallets.push(new Wallet());
   wallets.push(new Wallet());

   return wallets;
}

const WalletList = () => {
   const [wallets, setWallets] = useState<Wallet[]>(createWallets());

   useEffect(() => {
      wallets[0].sendMoney(100, wallets[1].getPublicKey());
   }, [])

   return (
      <div>
         {wallets.map((wallet, index) => (
            <div key={index}>
               {wallet.publicKey}
            </div>
         ))}
      </div>
   )
}

export default WalletList;
