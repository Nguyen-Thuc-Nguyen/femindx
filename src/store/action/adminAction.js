// actions/adminActions.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../config/axios'

export const loginAdmin = createAsyncThunk(
    'auth/loginAdmin',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/admin/login', {
                email,
                password,
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    },
)

export const addStudent = createAsyncThunk(
    'students/addStudent',
    async (studentData, { rejectWithValue }) => {
        try {
            console.log('Adding Student Data:', studentData)
            const response = await axiosInstance.post(
                '/admin/add-student',
                studentData,
            )
            return response.data
        } catch (error) {
            console.error(
                'Add Student Error:',
                error.response ? error.response : error,
            )
            return rejectWithValue(
                error.response?.data?.message ||
                    'An unexpected error occurred while adding the student',
            )
        }
    },
)

export const fetchStudents = createAsyncThunk(
    'students/fetchStudents',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/admin/all-students')
            return response.data.data
        } catch (error) {
            console.error('Fetch Students Error:', error)
            return rejectWithValue(
                error.response?.data?.message ||
                    'An unexpected error occurred while fetching students',
            )
        }
    },
)

export const deleteStudent = createAsyncThunk(
    'students/deleteStudent',
    async (studentId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(
                `/admin/delete-student/${studentId}`,
            )
            return response.data.data
        } catch (error) {
            console.error('Delete Student Error:', error)
            return rejectWithValue(
                error.response?.data?.message ||
                    'An unexpected error occurred while deleting the student',
            )
        }
    },
)

export const fetchStudentProfile = createAsyncThunk(
    'students/fetchStudentProfile',
    async (studentId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/admin/profile-student/${studentId}`,
            )
            return response.data.data
        } catch (error) {
            console.error('Fetch Student Profile Error:', error)
            return rejectWithValue(
                error.response?.data?.message ||
                    'An unexpected error occurred while fetching the student profile',
            )
        }
    },
)

export const UpdateStudent = createAsyncThunk(
    'students/updateStudent',
    async ({ studentData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                `/admin/update-student/${studentData._id}`,
                studentData
            );
            console.log('Updated student data:', response.data.data);
            return response.data.data;
        } catch (error) {
            console.error('Update Student Profile Error:', error);
            return rejectWithValue(
                error.response?.data?.message ||
                    'An unexpected error occurred while updating the student profile'
            );
        }
    }
);
