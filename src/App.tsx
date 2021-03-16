import React from 'react';
import logo from './logo.svg';
import styles from './styles/App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <h1>montycoin</h1>
      </header>
      <main className={styles.appMain}>

        <div className={styles.walletArea}>
          
        </div>
        <div className={styles.chainArea}>

        </div>

      </main>
    </div>
  );
}

export default App;
