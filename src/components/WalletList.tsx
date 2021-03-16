import React, { useState } from 'react';
import Wallet from '../blockchain/wallet';

const createWallets = (): Wallet[] => {
   const wallets = [];
   wallets.push(new Wallet());
   wallets.push(new Wallet());
   wallets.push(new Wallet());

   return wallets;
}

export const WalletList = () => {
   const [wallets, setWallets] = useState<Wallet[]>(createWallets());


   return (
      <div>
         
      </div>
   )
}
