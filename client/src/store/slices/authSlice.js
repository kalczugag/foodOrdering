import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../thunks/fetchUser";
import { editUser } from "../thunks/editUser";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        data: null,
    },
    extraReducers(builder) {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.data = action.payload || false;
            console.log(state.data);
        });

        builder.addCase(editUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(editUser.fulfilled, (state, action) => {
            state.isLoading = false;
            const editedUser = action.payload;

            const index = state.data.findIndex(
                (user) => user._id === editedUser._id
            );

            if (index !== -1) {
                state.data[index] = {
                    ...state.data[index],
                    username: editedUser.username,
                    email: editedUser.email,
                    city: editedUser.city,
                    street: editedUser.street,
                    postal: editedUser.postal,
                    phone: editedUser.phone,
                };
            }
        });

        builder.addCase(editUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const authReducer = authSlice.reducer;
