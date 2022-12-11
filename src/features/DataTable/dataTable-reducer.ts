import {createSlice} from "@reduxjs/toolkit"
import {StatusType} from '../../api';
import {getDocuments} from './dataTable-actions';

const initialState = {
    status: 'idle' as RequestStatusType,
    error: {message: undefined} as ErrorType,
    data: null as DataType[] | null

}

const slice = createSlice({
    name: 'stories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDocuments.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getDocuments.fulfilled, (state, action) => {
                state.data = action.payload.map(el => ({
                    id: el[0],
                    status: el[1],
                    sum: el[2],
                    qty: el[3],
                    volume: el[4],
                    name: el[5],
                    deliveryDate: el[6],
                    currency: el[7]
                }))
                state.status = 'idle'
            })
            .addCase(getDocuments.rejected, (state, action) => {
                state.error.message = action.payload
                state.status = 'idle'
            })
    }
})

export const dataTableReducer = slice.reducer

// Types
type DataType = {
    id: string,
    status: StatusType,
    sum: number,
    qty: number,
    volume: number,
    name: string,
    deliveryDate: string,
    currency: string
}

export type RequestStatusType = 'idle' | 'loading'

export type ErrorType = { message: string | undefined }