import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {StatusType} from '../../api';
import {getDocuments, submitItemsIds} from './dataTable-actions';

const initialState = {
  isInitialized: false,
  status: 'idle' as RequestStatusType,
  error: undefined as string | undefined,
  serverMessages: null as string | null,
  data: null as DataType[] | null,
  allChecked: false

}

const slice = createSlice({
  name: 'dataTable',
  initialState,
  reducers: {
    setAllChecked(state, action: PayloadAction<{ checked: boolean }>) {
      state.allChecked = action.payload.checked
      state.data = state.data && state.data.map(el => ({...el, checked: action.payload.checked}))
    },
    setCheckedItem(state, action: PayloadAction<{ id: string, checked: boolean }>) {
      state.data = state.data && state.data.map(el => el.id === action.payload.id ? {
        ...el,
        checked: action.payload.checked
      } : el)
    },
    setServerMessages(state, action: PayloadAction<{ serverMessages: string | null }>) {
      state.serverMessages = action.payload.serverMessages
    },
    setError(state, action: PayloadAction<{ error: string | undefined }>) {
      state.error = action.payload.error
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDocuments.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getDocuments.fulfilled, (state, action) => {
        state.data = action.payload.map(el => ({
          id: el[0],
          checked: false,
          name: el[5],
          status: el[1],
          volume: el[4],
          sum: el[2],
          qty: el[3],
          deliveryDate: el[6],
          currency: el[7],
          total: el[2] * el[3]
        }))
        state.status = 'idle'
        state.isInitialized = true
      })
      .addCase(getDocuments.rejected, (state, action) => {
        state.error = action.payload
        state.status = 'idle'
        state.isInitialized = true
      })
      .addCase(submitItemsIds.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(submitItemsIds.fulfilled, (state, action) => {
        state.serverMessages = action.payload.messages
        state.status = 'idle'
      })
      .addCase(submitItemsIds.rejected, (state, action) => {
        state.error = action.payload
        state.status = 'idle'
      })
  }
})

export const dataTableReducer = slice.reducer

export const {setAllChecked, setCheckedItem, setServerMessages, setError} = slice.actions

// Types
export type WeatherInitialStateType = typeof initialState

export type DataType = {
  id: string,
  checked: boolean
  status: StatusType,
  sum: number,
  qty: number,
  volume: number,
  name: string,
  deliveryDate: string,
  currency: string,
  total: number
}

export type RequestStatusType = 'idle' | 'loading'
