import React from 'react';
import styles from './App..module.scss'
import {productsAPI} from '../api';
import {useAppDispatch} from '../common/hooks/useAppDispatch';
import {getDocuments} from '../features/DataTable/dataTable-actions';

function App() {

    const dispatch = useAppDispatch()

    const onClickHandler = () => {
        dispatch(getDocuments())
    }

  return (
    <div className={styles.app}>
        <button onClick={onClickHandler}>qweqwe</button>
      app
    </div>
  );
}

export default App;
