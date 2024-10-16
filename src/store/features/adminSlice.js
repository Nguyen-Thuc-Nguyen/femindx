// src/slices/exampleSlice.js
import { createSlice } from '@reduxjs/toolkit'

// Define the initial state
const initialState = {}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
})

export const {} = adminSlice.actions

// Export the reducer
export default adminSlice.reducer
