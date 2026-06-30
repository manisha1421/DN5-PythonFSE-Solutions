import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCourses } from '../api/courseApi';
import { courses as localCourses } from '../data';

// Async thunk for fetching courses
export const fetchAllCourses = createAsyncThunk(
  'courses/fetchAll',
  async () => {
    await getAllCourses();
    // Return local courses mapped with proper data
    return localCourses;
  }
);

const enrollmentSlice = createSlice({
  name: 'enrollment',
  initialState: {
    enrolledCourses: [],
    courses: [],
    loading: false,
    error: null
  },
  reducers: {
    enroll: (state, action) => {
      const exists = state.enrolledCourses.find(
        c => c.id === action.payload.id
      );
      if (!exists) {
        state.enrolledCourses.push(action.payload);
      }
    },
    unenroll: (state, action) => {
      state.enrolledCourses = state.enrolledCourses.filter(
        c => c.id !== action.payload
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// Selectors
export const selectCourses = state => state.enrollment.courses;
export const selectCoursesLoading = state => state.enrollment.loading;
export const selectCoursesError = state => state.enrollment.error;
export const selectEnrolledCourses = state => state.enrollment.enrolledCourses;

export const { enroll, unenroll } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;