import axios, { AxiosResponse } from "axios"

export const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'http://lonk',
})

export const productsAPI = {
    getFirstDocuments() {
        return instance.get<RootDocumentsType>('documents1')
    },
    getSecondDocuments() {
        return instance.get<RootDocumentsType>('documents2')
    },
    setCancel(arrID: number[]) {
        return instance.post<number[], AxiosResponse<{messages: string}>>('cancel', {id: arrID})
    },
}

// types
export type RootDocumentsType = [string, StatusType, number, number, number, string, string, string ];

type StatusType = 'active' | 'archive'

