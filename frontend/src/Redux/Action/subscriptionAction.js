import axios from "axios";
import { server } from "../store";

export const buySubscription=()=>async(dispatch)=>{
   
    try{
        dispatch({type:"BuySubcriptionRequest"})
       
         

        const {data}=await axios.get(`${server}/plan/subscribe`,{
            withCredentials:true
        })


        dispatch({type:"BuySubcriptionSuccess",payload:data.subscriptionId})

    } catch (err) {

        dispatch({type:"BuySubcriptionFailure",payload:err.response.data.message})

    }

}
export const cancelSubscription=()=>async(dispatch)=>{
   
    try{
        dispatch({type:"CancelSubcriptionRequest"})
       
         

        const {data}=await axios.delete(`${server}/plan/subcription/cancel`,{
            withCredentials:true
        })


        dispatch({type:"CancelSubcriptionSuccess",payload:data})

    } catch (err) {

        dispatch({type:"CancelSubcriptionFailure",payload:err.response.data.message})

    }

}