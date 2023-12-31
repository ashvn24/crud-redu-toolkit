import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseFetch  } from "../FetchURL/fetch"; 

const initialState = {
  user: null,
  token: null,
};

const AuthDetails = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // setUser: (state, action) => {
    //   const { token } = action.payload;
    //   state.token = token;
    // },
  },
  extraReducers:(builder) =>{
    builder.addCase(getUser.fulfilled,(state,action) =>{
      state.token = action.payload;
    })
  }
});




// Configuring Redux Persist
const persistConfig = {
  key: "root", 
  storage, 
}

const persistedReducer = persistReducer(persistConfig, AuthDetails.reducer);

export const { setUser } = AuthDetails.actions;
export default persistedReducer;

export const getUser = createAsyncThunk('uses/LoginUser', async ({email,password}) => {
  const data = await baseFetch('login', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      email,
      password,
    }),
  })
  return data
})