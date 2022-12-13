import React from 'react';
import styles from './App..module.css'
import {DataTable} from '../features/DataTable/DataTable';
import {ShowNotifications} from '../common/components/ShowNotifications';
import {ProgressLinear} from '../common/components/ProgressLinear';
import {ProgressCircular} from '../common/components/CircularProgress';

function App() {

  return (
    <div className={styles.app}>
      <DataTable/>
      <ProgressCircular/>
      <ProgressLinear/>
      <ShowNotifications variant={'success'}/>
      <ShowNotifications variant={'error'}/>
    </div>
  );
}

export default App;
