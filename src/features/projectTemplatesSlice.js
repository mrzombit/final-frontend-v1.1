import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import URL from './../URL'
const CREATE_URL = `${URL}/projectTemplate/post/`
const FETCH_URL = `${URL}/projectTemplate/projectTemplates`
const UPDATE_URL = `${URL}/projectTemplate/edit?projectTemplateID=`
const DELETE_URL = `${URL}/projectTemplate/delete?projectTemplateID=`

const initialState = {
    projectTemplates: [],
    selectedProjectTemplate: {},
    status: 'idle',
    error: null
}

export const fetchProjectTemplates = createAsyncThunk(
    'projectTemplates/fetchProjectTemplates',
    async () => {
        const response = await axios.get(`${FETCH_URL}`)
        return response.data
    })

export const fetchProjectTemplateById = createAsyncThunk(
    'projectTemplates/fetchProjectTemplateById',
    async (id) => {
        const response = await axios.get(`${CREATE_URL}${id}`)
        return JSON.parse(JSON.stringify(response.data))
    })

export const addNewProjectTemplate = createAsyncThunk(
    'projectTemplates/addNewProjectTemplate',
    async (data) => {
        const response = await axios.post(CREATE_URL, data)
        return response.data
    })

export const deleteProjectTemplateById = createAsyncThunk(
    'projectTemplates/deleteProjectTemplateById',
    async (id) => {
        const response = await axios.delete(`${DELETE_URL}${id}`)
        return response.data
    })

export const updateProjectTemplate = createAsyncThunk(
    'projectTemplates/updateProjectTemplate',
    async (data) => {
        const response = await axios.put(`${UPDATE_URL}${data.id}`, data.data)
        return response.data
    }
)

const projectTemplatesSlice = createSlice({
    name: 'projectTemplates',
    initialState,
    reducers: {
        projectTemplateUpdated(state, action) {
            state.selectedProjectTemplate = action.payload
        },
        setSelectedProjectTemplate(state, action) {
            state.selectedProjectTemplate = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProjectTemplates.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchProjectTemplates.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.projectTemplates = action.payload
            })
            .addCase(fetchProjectTemplates.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchProjectTemplateById.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchProjectTemplateById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.selectedProjectTemplate = action.payload
            })
            .addCase(fetchProjectTemplateById.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewProjectTemplate.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.projectTemplates.push(action.payload.project)
                state.selectedProjectTemplate = action.payload.projectTemplate
            })
            .addCase(updateProjectTemplate.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.selectedProjectTemplate = action.payload.projectTemplate
            })
            .addCase(deleteProjectTemplateById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.projectTemplates = state.projectTemplates.filter(item => item._id !== action.payload.projecTemplate._id)
            })
    },

})

export const { projectTemplateUpdated, setSelectedProjectTemplate} = projectTemplatesSlice.actions

export default projectTemplatesSlice.reducer

export const selectAllProjectTemplates = (state) => state.projectTemplates.projectTemplates