import UserApi from "../../api/UserApi";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const register = createAsyncThunk(
    'user/register',
    async (payload) => {
        // call api to register
        const data = await UserApi.register(payload)
        //save data to local storage
        localStorage.setItem('access_token', data.data.jwt)
        localStorage.setItem('user', JSON.stringify(data.data.user))
        return data.data.user
    }
)

const UserSlice = createSlice({
    name: "user",
    initialState: {
        current: {},
        settings: {},
    },
    reducers: {},
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.current = action.payload
        }
    },
})

const { reducer } = UserSlice
export default reducer