import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null
  },
  reducers: {
    regiser: (state, action) =>{
       
        state.isLoggedIn = action.payload.isLoggedIn
        state.current = action.payload.userData
        state.token = action.payload.token
    }
  },
  // Code logic xử lý async action
//   extraReducers: (builder) => {
//     builder.addCase(getNewProducts.pending, (state) => {
//       state.isLoading = true;
//     });

//     builder.addCase(getNewProducts.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.newProducts = action.payload;
//     });

//     builder.addCase(getNewProducts.rejected, (state, action) => {
//       state.isLoading = false;
//       state.errorMessage = action.payload.message;
//     });
//   },
});

export const {regiser} = userSlice.actions
export default userSlice.reducer;
