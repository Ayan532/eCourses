import { createReducer } from "@reduxjs/toolkit";

export const userReducer=createReducer({},{
   
    LoginRequest:(state)=>{
        state.loading=true;
    },
    LoginSuccess:(state,action)=>{
        state.loading=false;
        state.isAuthenticated=true;
        state.user=action.payload.user;
        state.message=action.payload.message
    },
    LoginFailure:(state,action)=>{
        state.loading=false;
        state.isAuthenticated=false;
        state.user=null;
        state.error=action.payload;


    },
    LoadUserRequest:(state)=>{
        state.loading=true;
    },
    LoadUserSuccess:(state,action)=>{
        state.loading=false;
        state.isAuthenticated=true;
        state.user=action.payload.user;
        state.message=action.payload.message
    },
    LoadUserFailure:(state,action)=>{
        state.loading=false;
        state.isAuthenticated=false;
        state.user=null;
        state.error=action.payload;


    },
    LogoutUserRequest:(state)=>{
        state.loading=true;
    },
    LogoutUserSuccess:(state,action)=>{
        state.loading=false;
        state.isAuthenticated=false;
        state.user=null;
        state.message=action.payload.message
    },
    LogoutUserFailure:(state,action)=>{
        state.loading=false;
        state.isAuthenticated=true;
        state.error=action.payload;


    },
    RegisterUserRequest:(state)=>{
        state.loading=true;
    },
    RegisterUserSuccess:(state,action)=>{
        state.loading=false;
        state.isAuthenticated=true;
        state.user=action.payload.user;
        state.message=action.payload.message
    },
    RegisterUserFailure:(state,action)=>{
        state.loading=false;
        state.isAuthenticated=false;
        state.error=action.payload;


    },
    clearError:(state)=>{
        state.error=null
    },
    clearMessage:(state)=>{
        state.message=null
    }
     
})

export const profileReducer=createReducer({},{
   
    UpdateProfileRequest:(state)=>{
        state.loading=true;
    },
    UpdateProfileSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload
    },
    UpdateProfileFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;


    },
    DeleteProfileRequest:(state)=>{
        state.loading=true;
    },
    DeleteProfileSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload
    },
    DeleteProfileFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;


    },
    ChangePasswordRequest:(state)=>{
        state.loading=true;
    },
   ChangePasswordSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
 ChangePasswordFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;


    },
    UpdateProfilePictureRequest:(state)=>{
        state.loading=true;
    },
    UpdateProfilePictureSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload
    },
    UpdateProfilePictureFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;


    },
    ForgetPasswordRequest:(state)=>{
        state.loading=true;
    },
   ForgetPasswordSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload
    },
 ForgetPasswordFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;


    },
    ResetForgetPasswordRequest:(state)=>{
        state.loading=true;
    },
   ResetForgetPasswordSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload
    },
 ResetForgetPasswordFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;


    },
    RemoveToPlaylistRequest:(state)=>{
        state.loading=true;
    },
    RemoveToPlaylistSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload
    },
    RemoveToPlaylistFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;


    },
    clearError:(state)=>{
        state.error=null
    },
    clearMessage:(state)=>{
        state.message=null
    }
     
})