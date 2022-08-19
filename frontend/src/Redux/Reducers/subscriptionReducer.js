import { createReducer } from "@reduxjs/toolkit";

export const subscriptionReducer=createReducer({},{

  BuySubcriptionRequest:(state)=>{
    state.loading=true;
  },
  BuySubcriptionSuccess:(state,action)=>{
    state.loading=false;
    state.subscriptionId=action.payload;
  },
  BuySubcriptionFailure:(state,action)=>{
    state.loading=false;
    state.error=action.payload;
  },
  CancelSubcriptionRequest:(state)=>{
    state.loading=true;
  },
  CancelSubcriptionSuccess:(state,action)=>{
    state.loading=false;
    state.message=action.payload;
  },
  CancelSubcriptionFailure:(state,action)=>{
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