import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {dataTableReducer} from '../features/DataTable/dataTable-reducer';

const rootReducer = combineReducers({
  dataTable: dataTableReducer
})

export const store = configureStore({reducer: rootReducer})

// Types
export type AppRootStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch