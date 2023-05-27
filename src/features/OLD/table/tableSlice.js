import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addTable: (state) => {

    },
    addRow: (state, action) => {

    },
    updateRow: (state, action) => {

    },
    DeleteRow: (state, action) => {

    },
    addCol: (state, action) => {

    },
  },
  
})

// Action creators are generated for each case reducer function
export const { addTable, addRow, updateRow, deleteRow, addCol } = tableSlice.actions

export default tableSlice.reducer