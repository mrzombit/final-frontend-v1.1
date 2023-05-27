import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import URL from './../URL'

const CREATE_URL = `${URL}/assetAccount/post/`
const FETCH_URL = `${URL}/assetAccount/assetAccounts`
const UPDATE_URL = `${URL}/assetAccount/edit?assetAccountID=`
const DELETE_URL = `${URL}/assetAccount/delete?assetAccountID=`

const initialState = {
    assetAccounts: [],
    selectedAssetAccount: {},
    status: 'idle',
    error: null
}

export const fetchAssetAccounts = createAsyncThunk(
    'assetAccounts/fetchAssetAccounts',
    async () => {
        const response = await axios.get(`${FETCH_URL}`)
        return response.data
    })

export const fetchAssetAccountById = createAsyncThunk(
    'assetAccounts/fetchAssetAccountById',
    async (id) => {
        const response = await axios.get(`${CREATE_URL}${id}`)
        return response.data
    })

export const addNewAssetAccount = createAsyncThunk(
    'assetAccounts/addNewAssetAccount',
    async (data) => {
        const response = await axios.post(CREATE_URL, data)
        return response.data
    })

export const deleteAssetAccountById = createAsyncThunk(
    'assetAccounts/deleteAssetAccountById',
    async (id) => {
        const response = await axios.delete(`${DELETE_URL}${id}`)
        return response.data
    })

export const updateAssetAccount = createAsyncThunk(
    'assetAccounts/updateAssetAccount',
    async (data) => {
        const response = await axios.put(`${UPDATE_URL}${data.id}`, data.data)
        return response.data
    }
)

const assetAccountsSlice = createSlice({
    name: 'assetAccounts',
    initialState,
    reducers: {
        assetAccountUpdated(state, action) {
            state.selectedAssetAccount = action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAssetAccounts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAssetAccounts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.assetAccounts = action.payload
            })
            .addCase(fetchAssetAccounts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchAssetAccountById.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAssetAccountById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.selectedAssetAccount = action.payload
            })
            .addCase(fetchAssetAccountById.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewAssetAccount.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.assetAccounts.push(action.payload.assetAccount)
            })
            .addCase(updateAssetAccount.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.assetAccount = action.payload.assetAccount
            })
            .addCase(deleteAssetAccountById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.assetAccounts = state.assetAccounts.filter(item => item._id !== action.payload.assetAccount._id)
            })
    },

})

export const { assetAccountUpdated } = assetAccountsSlice.actions

export default assetAccountsSlice.reducer

export const selectAllAssetAccounts = (state) => state.assetAccounts.assetAccounts