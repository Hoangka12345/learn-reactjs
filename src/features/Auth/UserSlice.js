import UserApi from "../../api/UserApi";
import StorageKeys from "../../constants/storage-keys";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const register = createAsyncThunk(
    'user/register',
    async (payload) => {
        // call api to register
        const data = await UserApi.register(payload)
        //save data to local storage
        localStorage.setItem(StorageKeys.TOKEN, data.data.jwt)
        localStorage.setItem(StorageKeys.USER, JSON.stringify(data.data.user))
        return data.data.user
    }
)

export const login = createAsyncThunk(
    'user/login',
    async (payload) => {
        // call api to register
        const data = await UserApi.login(payload)
        //save data to local storage
        localStorage.setItem(StorageKeys.TOKEN, data.data.jwt)
        localStorage.setItem(StorageKeys.USER, JSON.stringify(data.data.user))
        return data.data.user
    }
)

const UserSlice = createSlice({
    name: "user",
    initialState: {
        current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
        settings: {},
    },
    reducers: {
        logout(state) {
            localStorage.removeItem(StorageKeys.USER)
            localStorage.removeItem(StorageKeys.TOKEN)

            state.current = {}
        }
    },
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.current = action.payload
        },

        [login.fulfilled]: (state, action) => {
            state.current = action.payload
        }
    },
})

const { actions, reducer } = UserSlice
export const { logout } = actions
export default reducer