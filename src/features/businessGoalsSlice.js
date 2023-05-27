import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import URL from './../URL'

const CREATE_URL = `${URL}/businessGoal/post/`
const FETCH_URL = `${URL}/businessGoal/businessGoals`
const UPDATE_URL = `${URL}/businessGoal/edit?businessGoalID=`
const DELETE_URL = `${URL}/businessGoal/delete?businessGoalID=`

const initialState = {
    businessGoals: [],
    selectedBusinessGoal: {},
    status: 'idle',
    error: null
}

export const fetchBusinessGoals = createAsyncThunk(
    'businessGoals/fetchBusinessGoals',
    async () => {
        const response = await axios.get(`${FETCH_URL}`)
        return response.data
    })

export const fetchBusinessGoalById = createAsyncThunk(
    'businessGoals/fetchBusinessGoalById',
    async (id) => {
        const response = await axios.get(`${CREATE_URL}${id}`)
        return response.data
    })

export const addNewBusinessGoal = createAsyncThunk(
    'businessGoals/addNewBusinessGoal',
    async (data) => {
        const response = await axios.post(CREATE_URL, data)
        return response.data
    })

export const deleteBusinessGoalById = createAsyncThunk(
    'businessGoals/deleteBusinessGoalById',
    async (id) => {
        const response = await axios.delete(`${DELETE_URL}${id}`)
        return response.data
    })

export const updateBusinessGoal = createAsyncThunk(
    'businessGoals/updateBusinessGoal',
    async (data) => {
        const response = await axios.put(`${UPDATE_URL}${data.id}`, data.data)
        return response.data
    }
)

const businessGoalsSlice = createSlice({
    name: 'businessGoals',
    initialState,
    reducers: {
        businessGoalUpdated(state, action) {
            state.selectedBusinessGoal = action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchBusinessGoals.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchBusinessGoals.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.businessGoals = action.payload
            })
            .addCase(fetchBusinessGoals.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchBusinessGoalById.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchBusinessGoalById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.selectedBusinessGoal = action.payload
            })
            .addCase(fetchBusinessGoalById.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewBusinessGoal.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.businessGoals.push(action.payload.businessGoal)
            })
            .addCase(updateBusinessGoal.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.businessGoal = action.payload.businessGoal
            })
            .addCase(deleteBusinessGoalById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.businessGoals = state.businessGoals.filter(item => item._id !== action.payload.businessGoal._id)
            })
    },

})

export const { businessGoalUpdated } = businessGoalsSlice.actions

export default businessGoalsSlice.reducer

export const selectAllBusinessGoals = (state) => state.businessGoals.businessGoals