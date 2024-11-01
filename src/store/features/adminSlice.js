import { createSlice } from '@reduxjs/toolkit'
import {
    addStudent,
    deleteStudent,
    fetchStudentProfile,
    fetchStudents,
    loginAdmin,
    UpdateStudent,
} from '../action/adminAction'

const initialState = {
    admin: null,
    students: [],
    loading: false,
    error: null,
    token: null,
    selectStudent: {},
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        logoutAdmin: (state) => {
            state.admin = null
            state.token = null
            state.students = []
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.loading = false
                state.admin = action.payload.admin
                state.token = action.payload.token
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(addStudent.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addStudent.fulfilled, (state, action) => {
                state.loading = false
                state.students.push(action.payload)
            })
            .addCase(addStudent.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.students = action.payload
                state.error = null
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.students = state.students.filter(
                    (student) => student.studentId !== action.payload.studentId,
                )
                state.error = null
            })
            .addCase(deleteStudent.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(fetchStudentProfile.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchStudentProfile.fulfilled, (state, action) => {
                state.loading = false
                state.selectedStudent = action.payload
            })
            .addCase(fetchStudentProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(UpdateStudent.fulfilled, (state, action) => {
                state.loading = false
                const index = state.students.findIndex(
                    (student) => student.id === action.payload.id,
                )
                if (index !== -1) {
                    state.students[index] = action.payload
                }
            })
            .addCase(UpdateStudent.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const { logoutAdmin } = adminSlice.actions
export default adminSlice.reducer
