import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const registerApi = createAsyncThunk(
  'users/register',
  async (userData, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI
    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })
      if (!res.ok) {
        const errorData = await res.json()
        return rejectWithValue(errorData.message || 'Registration failed')
      }
      return await res.json()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const loginApi = createAsyncThunk(
  'users/login',
  async (userData, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })
      if (!res.ok) {
        const errorData = await res.json()
        return rejectWithValue(errorData.message || 'Registration failed')
      }
      return await res.json()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) =>
    builder
      .addCase(registerApi.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerApi.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.data
      })
      .addCase(registerApi.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(loginApi.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
      })
      .addCase(loginApi.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      }),
})

export default authSlice.reducer
