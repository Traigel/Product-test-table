import React, {useEffect, useState} from 'react';
import './App.css';
import {productsAPI} from '../api';

function App() {

    const onClickHandler = async () => {
        const qwe = await productsAPI.setCancel([1,2,3])
        console.log(qwe.data.messages)
    }

  return (
    <div className="App">
        <button onClick={onClickHandler}>qweqwe</button>
      app
    </div>
  );
}

export default App;
