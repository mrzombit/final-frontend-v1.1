import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import URL from './../URL'

const CREATE_URL = `${URL}/industry/post/`
const FETCH_URL = `${URL}/industry/industrys`
const UPDATE_URL = `${URL}/industry/edit?industryID=`
const DELETE_URL = `${URL}/industry/delete?industryID=`

const initialState = {
    industries: [],
    selectedIndustry: {},
    status: 'idle',
    error: null
}

export const fetchIndustries = createAsyncThunk(
    'industries/fetchIndustries',
    async () => {
        const response = await axios.get(`${FETCH_URL}`)
        return response.data
    })

export const fetchIndustryById = createAsyncThunk(
    'industries/fetchIndustryById',
    async (id) => {
        const response = await axios.get(`${CREATE_URL}${id}`)
        return response.data
    })

export const addNewIndustry = createAsyncThunk(
    'industries/addNewIndustry',
    async (data) => {
        const response = await axios.post(CREATE_URL, data)
        return response.data
    })

export const deleteIndustryById = createAsyncThunk(
    'industries/deleteIndustryById',
    async (id) => {
        const response = await axios.delete(`${DELETE_URL}${id}`)
        return response.data
    })

export const updateIndustry = createAsyncThunk(
    'industries/updateIndustry',
    async (data) => {
        const response = await axios.put(`${UPDATE_URL}${data.id}`, data.data)
        return response.data
    }
)

const industriesSlice = createSlice({
    name: 'industries',
    initialState,
    reducers: {
        industryUpdated(state, action) {
            state.selectedIndustry = action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchIndustries.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchIndustries.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.industries = action.payload
            })
            .addCase(fetchIndustries.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchIndustryById.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchIndustryById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.selectedIndustry = action.payload
            })
            .addCase(fetchIndustryById.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewIndustry.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.industries.push(action.payload.industry)
            })
            .addCase(updateIndustry.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.industry = action.payload.industry
            })
            .addCase(deleteIndustryById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.industries = state.industries.filter(item => item._id !== action.payload.industry._id)
            })
    },

})

export const { industryUpdated } = industriesSlice.actions

export default industriesSlice.reducer

export const selectAllIndustries = (state) => state.industries.industries