import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import URL from './../URL'

const CREATE_URL = `${URL}/currency/post/`
const FETCH_URL = `${URL}/currency/currencys`
const UPDATE_URL = `${URL}/currency/edit?currencyID=`
const DELETE_URL = `${URL}/currency/delete?currencyID=`

const initialState = {
    currencies: [],
    selectedCurrency: {},
    status: 'idle',
    error: null
}

export const fetchCurrencies = createAsyncThunk(
    'currencies/fetchCurrencies',
    async () => {
        const response = await axios.get(`${FETCH_URL}`)
        return response.data
    })

export const fetchCurrencyById = createAsyncThunk(
    'currencies/fetchCurrencyById',
    async (id) => {
        const response = await axios.get(`${CREATE_URL}${id}`)
        return response.data
    })

export const addNewCurrency = createAsyncThunk(
    'currencies/addNewCurrency',
    async (data) => {
        const response = await axios.post(CREATE_URL, data)
        return response.data
    })

export const deleteCurrencyById = createAsyncThunk(
    'currencies/deleteCurrencyById',
    async (id) => {
        const response = await axios.delete(`${DELETE_URL}${id}`)
        return response.data
    })

export const updateCurrency = createAsyncThunk(
    'currencies/updateCurrency',
    async (data) => {
        const response = await axios.put(`${UPDATE_URL}${data.id}`, data.data)
        return response.data
    }
)

const currenciesSlice = createSlice({
    name: 'currencies',
    initialState,
    reducers: {
        currencyUpdated(state, action) {
            state.selectedCurrency = action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCurrencies.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCurrencies.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.currencies = action.payload
            })
            .addCase(fetchCurrencies.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchCurrencyById.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCurrencyById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.selectedCurrency = action.payload
            })
            .addCase(fetchCurrencyById.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewCurrency.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.currencies.push(action.payload.currency)
            })
            .addCase(updateCurrency.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.currency = action.payload.currency
            })
            .addCase(deleteCurrencyById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.currencies = state.currencies.filter(item => item._id !== action.payload.currency._id)
            })
    },

})

export const { currencyUpdated } = currenciesSlice.actions

export default currenciesSlice.reducer

export const selectAllCurrencies = (state) => state.currencies.currencies