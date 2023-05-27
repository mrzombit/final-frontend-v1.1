import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import URL from './../URL'

const CREATE_URL = `${URL}/project/post/`
const FETCH_URL = `${URL}/project/user/`
const UPDATE_URL = `${URL}/project/edit?projectID=`
const DELETE_URL = `${URL}/project/delete?projectID=`

const initialState = {
    projects: [],
    selectedProject: {},
    shallowCreateProject: {},
    status: 'idle',
    error: null
}

export const fetchProjectsByUserId = createAsyncThunk(
    'projects/fetchProjects',
    async (userId) => {
        const response = await axios.get(`${FETCH_URL}${userId}`)
        return response.data
    })

export const fetchProjectById = createAsyncThunk(
    'projects/fetchProjectById',
    async (id) => {
        const response = await axios.get(`${CREATE_URL}${id}`)
        return JSON.parse(JSON.stringify(response.data))
    })

export const addNewProject = createAsyncThunk(
    'projects/addNewProject',
    async (data) => {
        const response = await axios.post(CREATE_URL, data)
        return response.data
    })

export const deleteProjectById = createAsyncThunk(
    'projects/deleteProjectById',
    async (id) => {
        const response = await axios.delete(`${DELETE_URL}${id}`)
        return response.data
    })

export const updateProject = createAsyncThunk(
    'projects/updateProject',
    async (data) => {
        const response = await axios.put(`${UPDATE_URL}${data.id}`, data.data)
        return response.data
    }
)

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        projectUpdated(state, action) {
            state.selectedProject = action.payload
        },
        setSelectedProject(state,action){
            state.selectedProject = action.payload
        },
        setShallowCreateProject(state,action){
            state.shallowCreateProject = action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProjectsByUserId.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchProjectsByUserId.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.projects = action.payload
            })
            .addCase(fetchProjectsByUserId.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchProjectById.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchProjectById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.selectedProject = action.payload
            })
            .addCase(fetchProjectById.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewProject.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.projects.push(action.payload.project)
                state.selectedProject = action.payload.project
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.selectedProject = action.payload.project
            })
            .addCase(deleteProjectById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.projects = state.projects.filter(item => item._id !== action.payload.project._id)
            })
    },

})

export const { projectUpdated, setSelectedProject, setShallowCreateProject } = projectsSlice.actions

export default projectsSlice.reducer

export const selectAllProjects = (state) => state.projects.projects