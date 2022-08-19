import axios from 'axios'
import { server } from '../store'

export const loginUser=(email,password)=>async(dispatch)=>{
   
    try{
        dispatch({type:"LoginRequest"})


        const {data}=await axios.post(`${server}/users/login`,{email,password},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })


        dispatch({type:"LoginSuccess",payload:data})

    } catch (err) {

        dispatch({type:"LoginFailure",payload:err.response.data.message})

    }

}

export const LoadUser=()=>async(dispatch)=>{
   
    try{
        dispatch({type:"LoadUserRequest"})


        const {data}=await axios.get(`${server}/users/me`,{
            withCredentials:true
        })

        dispatch({type:"LoadUserSuccess",payload:data})

    } catch (err) {

        dispatch({type:"LoadUserFailure",payload:err.response.data.message})

    }

}

export const LogoutUser=()=>async(dispatch)=>{
   
    try{
        dispatch({type:"LogoutUserRequest"})


        const {data}=await axios.get(`${server}/users/logout`,{
            withCredentials:true
        })

     console.log(data);
        dispatch({type:"LogoutUserSuccess",payload:data})

    } catch (err) {

        dispatch({type:"LogoutUserFailure",payload:err.response.data.message})

    }

}

export const RegisterUser=(formData)=>async(dispatch)=>{

    try{
        dispatch({type:"RegisterUserRequest"})


        const {data}=await axios.post(`${server}/users/register`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        })


        dispatch({type:"RegisterUserSuccess",payload:data})

    } catch (err) {

        dispatch({type:"RegisterUserFailure",payload:err.response.data.message})

    }
  

}





//Profile Action
export const changePassword=(oldPassword,newPassword)=>async(dispatch)=>{

    try{
        dispatch({type:"ChangePasswordRequest"})


        const {data}=await axios.put(`${server}/users/me/password/update`,{oldPassword,newPassword},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })
     
        dispatch({type:"ChangePasswordSuccess",payload:data.message})

    } catch (err) {

        dispatch({type:"ChangePasswordFailure",payload:err.response.data.message})

    }
  

}

export const deleteProfile=()=>async(dispatch)=>{

    try{
        dispatch({type:"DeleteProfileRequest"})


        const {data}=await axios.delete(`${server}/users/me`,{
        
            withCredentials:true
        })

        dispatch({type:"DeleteProfileSuccess",payload:data.message})

    } catch (err) {

        dispatch({type:"DeleteProfileFailure",payload:err.response.data.message})

    }
  

}
export const updateProfile=(name,email)=>async(dispatch)=>{

    try{
        dispatch({type:"UpdateProfileRequest"})


        const {data}=await axios.put(`${server}/users/me/update`,{name,email},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })

    
        dispatch({type:"UpdateProfileSuccess",payload:data.message})

    } catch (err) {

        dispatch({type:"UpdateProfileFailure",payload:err.response.data.message})

    }
  

}


export const updateProfilePicture=(formData)=>async(dispatch)=>{

    try{
        dispatch({type:"UpdateProfilePictureRequest"})


        const {data}=await axios.put(`${server}/users/me/profilepicture`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        })

     
        dispatch({type:"UpdateProfilePictureSuccess",payload:data.message})

    } catch (err) {

        dispatch({type:"UpdateProfilePictureFailure",payload:err.response.data.message})

    }
  

}


//Forget Password
export const resetPassword=(token,password,confirmPassword)=>async(dispatch)=>{

    try{
        dispatch({type:"ResetForgetPasswordRequest"})


        const {data}=await axios.put(`${server}/users/resetpassword/${token}`,{password,confirmPassword},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })

     
        dispatch({type:"ResetForgetPasswordSuccess",payload:data.message})

    } catch (err) {

        dispatch({type:"ResetForgetPasswordFailure",payload:err.response.data.message})

    }
  

}
export const forgetPassword=(email)=>async(dispatch)=>{

    try{
        dispatch({type:"ForgetPasswordRequest"})


        const {data}=await axios.post(`${server}/users/forgetpassword`,{email},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })

     
        dispatch({type:"ForgetPasswordSuccess",payload:data.message})

    } catch (err) {

        dispatch({type:"ForgetPasswordFailure",payload:err.response.data.message})

    }
  

}

