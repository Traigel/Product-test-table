import {createSlice} from "@reduxjs/toolkit"
import {StatusType} from '../../api';
import {getDocuments} from './dataTable-actions';

const initialState = {
    status: 'idle' as RequestStatusType,
    error: undefined as string | undefined,
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
                    name: el[5],
                    status: el[1],
                    volume: el[4],
                    sum: el[2],
                    qty: el[3],
                    deliveryDate: el[6],
                    currency: el[7],
                    total: `${el[2] * el[3]} ${el[7]}`
                }))
                state.status = 'idle'
            })
            .addCase(getDocuments.rejected, (state, action) => {
                state.error = action.payload
                state.status = 'idle'
            })
    }
})

export const dataTableReducer = slice.reducer

// Types
export type DataType = {
    id: string,
    status: StatusType,
    sum: number,
    qty: number,
    volume: number,
    name: string,
    deliveryDate: string,
    currency: string,
    total: string
}

export type RequestStatusType = 'idle' | 'loading'
