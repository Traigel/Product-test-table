import React from 'react';
import styles from './App..module.scss'
import {DataTable} from '../features/DataTable/DataTable';

function App() {

  return (
    <div className={styles.app}>
      <DataTable/>
    </div>
  );
}

export default App;
