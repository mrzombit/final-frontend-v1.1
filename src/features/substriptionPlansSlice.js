import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import URL from './../URL'

const CREATE_URL = `${URL}/subscriptionPlan/post/`
const FETCH_URL = `${URL}/subscriptionPlan/subscriptionPlans`
const UPDATE_URL = `${URL}/subscriptionPlan/edit?subscriptionPlanID=`
const DELETE_URL = `${URL}/subscriptionPlan/delete?subscriptionPlanID=`

const initialState = {
    subscriptionPlans: [],
    selectedSubscriptionPlan: {},
    status: 'idle',
    error: null
}

export const fetchSubscriptionPlans = createAsyncThunk(
    'subscriptionPlans/fetchSubscriptionPlans',
    async () => {
        const response = await axios.get(`${FETCH_URL}`)
        return response.data
    })

export const fetchSubscriptionPlanById = createAsyncThunk(
    'subscriptionPlans/fetchSubscriptionPlanById',
    async (id) => {
        const response = await axios.get(`${CREATE_URL}${id}`)
        return response.data
    })

export const addNewSubscriptionPlan = createAsyncThunk(
    'subscriptionPlans/addNewSubscriptionPlan',
    async (data) => {
        const response = await axios.post(CREATE_URL, data)
        return response.data
    })

export const deleteSubscriptionPlanById = createAsyncThunk(
    'subscriptionPlans/deleteSubscriptionPlanById',
    async (id) => {
        const response = await axios.delete(`${DELETE_URL}${id}`)
        return response.data
    })

export const updateSubscriptionPlan = createAsyncThunk(
    'subscriptionPlans/updateSubscriptionPlan',
    async (data) => {
        const response = await axios.put(`${UPDATE_URL}${data.id}`, data.data)
        return response.data
    }
)

const subscriptionPlansSlice = createSlice({
    name: 'subscriptionPlans',
    initialState,
    reducers: {
        subscriptionPlanUpdated(state, action) {
            state.selectedSubscriptionPlan = action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchSubscriptionPlans.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSubscriptionPlans.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.subscriptionPlans = action.payload
            })
            .addCase(fetchSubscriptionPlans.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchSubscriptionPlanById.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSubscriptionPlanById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.selectedSubscriptionPlan = action.payload
            })
            .addCase(fetchSubscriptionPlanById.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewSubscriptionPlan.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.subscriptionPlans.push(action.payload.subscriptionPlan)
            })
            .addCase(updateSubscriptionPlan.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.subscriptionPlan = action.payload.subscriptionPlan
            })
            .addCase(deleteSubscriptionPlanById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.subscriptionPlans = state.subscriptionPlans.filter(item => item._id !== action.payload.subscriptionPlan._id)
            })
    },

})

export const { subscriptionPlanUpdated } = subscriptionPlansSlice.actions

export default subscriptionPlansSlice.reducer

export const selectAllSubscriptionPlans = (state) => state.subscriptionPlans.subscriptionPlans