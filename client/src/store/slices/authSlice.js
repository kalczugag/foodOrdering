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
        });

        builder.addCase(editUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(editUser.fulfilled, (state, action) => {
            state.isLoading = false;
            const editedUser = action.payload;

            state.data = {
                ...state.data,
                username: editedUser.username,
                email: editedUser.email,
                address: {
                    ...state.data.address,
                    city: editedUser.address.city,
                    street: editedUser.address.street,
                    postal: editedUser.address.postal,
                },
                phone: editedUser.phone,
            };
        });

        builder.addCase(editUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const authReducer = authSlice.reducer;
