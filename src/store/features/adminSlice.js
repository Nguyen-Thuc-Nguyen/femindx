import { createSlice } from '@reduxjs/toolkit';
import {
    addClass,
    addStudent,
    addTeacher,
    deleteClass,
    deleteStudent,
    deleteTeacher,
    fetchClasses,
    fetchStudentProfile,
    fetchStudents,
    fetchTeacherProfile,
    fetchTeachers,
    loginAdmin,
    UpdateStudent,
} from '../action/adminAction';

const initialState = {
    admin: null,
    students: [],
    loading: false,
    error: null,
    token: null,
    selectStudent: {},
    teachers: [],
    classes: [],
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        logoutAdmin: (state) => {
            state.admin = null;
            state.token = null;
            state.students = [];
            state.error = null;
            state.teachers = [];
            state.classes = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.admin = action.payload.admin;
                state.token = action.payload.token;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.students.push(action.payload);
            })
            .addCase(addStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.students = action.payload;
                state.error = null;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.students = state.students.filter(
                    (student) => student._id !== action.payload._id
                );
                state.error = null;
            })
            .addCase(deleteStudent.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(fetchStudentProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStudentProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.selectStudent = action.payload;
            })
            .addCase(fetchStudentProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(UpdateStudent.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.students.findIndex(
                    (student) => student._id === action.payload.studentId
                );
                if (index !== -1) {
                    state.students[index] = action.payload;
                }
            })
            .addCase(UpdateStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchTeachers.fulfilled, (state, action) => {
                state.teachers = action.payload;
                state.error = null;
            })
            .addCase(fetchTeachers.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(addTeacher.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTeacher.fulfilled, (state, action) => {
                state.loading = false;
                state.teachers.push(action.payload);
            })
            .addCase(addTeacher.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchTeacherProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.teacherProfile = action.payload;
            })
            .addCase(fetchClasses.fulfilled, (state, action) => {
                state.classes = action.payload;
                state.error = null;
            })
            .addCase(addClass.fulfilled, (state, action) => {
                state.loading = false;
                state.classes.push(action.payload);
            })
            .addCase(deleteClass.fulfilled, (state, action) => {
                state.loading = false;
                state.classes = state.classes.filter(cls => cls._id !== action.payload._id);
            });
    },
});

export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
