import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import URL from './../URL'

const CREATE_URL = `${URL}/transaction/post/`
const FETCH_URL = `${URL}/transaction/transactions`
const UPDATE_URL = `${URL}/transaction/edit?transactionID=`
const DELETE_URL = `${URL}/transaction/delete?transactionID=`

const initialState = {
    transactions: [],
    selectedTransaction: {},
    status: 'idle',
    error: null
}

export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    async () => {
        const response = await axios.get(`${FETCH_URL}`)
        return response.data
    })

export const fetchTransactionById = createAsyncThunk(
    'transactions/fetchTransactionById',
    async (id) => {
        const response = await axios.get(`${CREATE_URL}${id}`)
        return response.data
    })

export const addNewTransaction = createAsyncThunk(
    'transactions/addNewTransaction',
    async (data) => {
        const response = await axios.post(CREATE_URL, data)
        return response.data
    })

export const deleteTransactionById = createAsyncThunk(
    'transactions/deleteTransactionById',
    async (id) => {
        const response = await axios.delete(`${DELETE_URL}${id}`)
        return response.data
    })

export const updateTransaction = createAsyncThunk(
    'transactions/updateTransaction',
    async (data) => {
        const response = await axios.put(`${UPDATE_URL}${data.id}`, data.data)
        return response.data
    }
)

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        transactionUpdated(state, action) {
            state.selectedTransaction = action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTransactions.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.transactions = action.payload
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchTransactionById.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchTransactionById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.selectedTransaction = action.payload
            })
            .addCase(fetchTransactionById.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewTransaction.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.transactions.push(action.payload.transaction)
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.transaction = action.payload.transaction
            })
            .addCase(deleteTransactionById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.transactions = state.transactions.filter(item => item._id !== action.payload.transaction._id)
            })
    },

})

export const { transactionUpdated } = transactionsSlice.actions

export default transactionsSlice.reducer

export const selectAllTransactions = (state) => state.transactions.transactions