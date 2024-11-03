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
                studentData,
            )
            console.log('Updated student data:', response.data.data)
            return response.data.data
        } catch (error) {
            console.error('Update Student Profile Error:', error)
            return rejectWithValue(
                error.response?.data?.message ||
                'An unexpected error occurred while updating the student profile',
            )
        }
    },
)

//////////////////////////////////////////////////////////

export const fetchTeachers = createAsyncThunk(
    'teachers/fetchTeachers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/admin/all-teachers')
            return response.data.data
        } catch (error) {
            console.error('Fetch Students Error:', error)
            return rejectWithValue(
                error.response?.data?.message ||
                'An unexpected error occurred while fetching teachers',
            )
        }
    },
)

export const addTeacher = createAsyncThunk(
    'teachers/addTeacher',
    async (teacherData, { rejectWithValue }) => {
        try {
            console.log('Adding Teacher Data:', teacherData)
            const response = await axiosInstance.post(
                '/admin/add-teacher',
                teacherData,
            )
            return response.data
        } catch (error) {
            console.error(
                'Add Teacher Error:',
                error.response ? error.response : error,
            )
            return rejectWithValue(
                error.response?.data?.message ||
                'An unexpected error occurred while adding the teacher',
            )
        }
    },
)

export const fetchTeacherProfile = createAsyncThunk(
    'admin/fetchTeacherProfile',
    async (teacherId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/admin/teacher-profile/${teacherId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const deleteTeacher = createAsyncThunk(
    'teachers/deleteTeacher',
    async (teacherId, { rejectWithValue }) => {
        try {
            console.log(`Attempting to delete teacher with ID: ${teacherId}`);
            const response = await axiosInstance.delete(`/admin/delete-teacher/${teacherId}`);
            console.log("Response from delete:", response);
            return response.data.data;
        } catch (error) {
            console.error('Delete Teacher Error:', error);
            const message = error.response?.data?.message || 'An unexpected error occurred while deleting the teacher';
            return rejectWithValue(message);
        }
    },
);

//////////////////////////////////////////////////////////

export const fetchClasses = createAsyncThunk(
    'classes/fetchClasses',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/admin/all-classes')
            return response.data.data
        } catch (error) {
            console.error('Fetch Students Error:', error)
            return rejectWithValue(
                error.response?.data?.message ||
                'An unexpected error occurred while fetching classes',
            )
        }
    },
)

export const addClass = createAsyncThunk(
    'classes/addClass',
    async ({ className, teacher }, { rejectWithValue }) => {
        try {
            console.log({ className, teacher });
            const response = await axiosInstance.post('/admin/add-class', {
                className,
                teacher
            });
            return response.data.data;
        } catch (error) {
            console.error('Fetch Classes Error:', error.response ? error.response.data : error);
            return rejectWithValue(
                error.response?.data?.message ||
                'An unexpected error occurred while adding the class',
            );
        }
    },
);
export const deleteClass = createAsyncThunk(
    'classes/deleteClass',
    async (classId, { rejectWithValue }) => {
        try {
            console.log(`Attempting to delete class with ID: ${classId}`);
            const response = await axiosInstance.delete(`/admin/delete-class`, {
                data: { classId },
            });
            console.log("Response from delete:", response);
            return response.data;
        } catch (error) {
            console.error('Delete Classes Error:', error.response ? error.response.data : error);
            return rejectWithValue(
                error.response?.data?.message ||
                'An unexpected error occurred while deleting the class'
            );
        }
    }
);