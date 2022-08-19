import axios from "axios";
import { server } from "../store";

export const admincreateCourses=(formData)=>async(dispatch)=>{
   
    try{
        dispatch({type:"CreateCourseRequest"})


        const {data}=await axios.post(`${server}/courses`,formData,{

            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        })
    

        dispatch({type:"CreateCourseSuccess",payload:data.message})

    } catch (err) {

        dispatch({type:"CreateCourseFailure",payload:err.response.data.message})

    }

}
export const deleteCourses=(id)=>async(dispatch)=>{
   
    try{
        dispatch({type:"DeleteCourseRequest"})


        const {data}=await axios.delete(`${server}/courses/${id}`,{
            withCredentials:true
        })

        dispatch({type:"DeleteCourseSuccess",payload:data.message})

    } catch (err) {

        dispatch({type:"DeleteCourseFailure",payload:err.response.data.message})

    }

}

export const admincreateCoursesLectures=(id,formData) =>async(dispatch)=>{
   
    try{
        dispatch({type:"AddCourseLectureRequest"})


        const {data}=await axios.post(`${server}/courses/${id}`,formData,{

            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        })

        dispatch({type:"AddCourseLectureSuccess",payload:data.message})

    } catch (err) {

        dispatch({type:"AddCourseLectureFailure",payload:err.response.data.message})

    }

}

export const admindeleteCoursesLectures=(courseId,lectureId)=>async(dispatch)=>{
   
    try{
        dispatch({type:"DeleteCourseLectureRequest"})


        const {data}=await axios.delete(`${server}/courses/lecture?courseId=${courseId}&lectureId=${lectureId}`,{
            withCredentials:true
        })
      console.log(data);
        dispatch({type:"DeleteCourseLectureSuccess",payload:data.message})

    } catch (err) {

        dispatch({type:"DeleteCourseLectureFailure",payload:err.response.data.message})

    }

}




export const getadminCourses=() =>async(dispatch)=>{
   
    try{
        dispatch({type:"AdminGetCourseRequest"})


        const {data}=await axios.get(`${server}/courses/admin/courses`,{
            withCredentials:true
        })

        dispatch({type:"AdminGetCourseSuccess",payload:data.courses})

    } catch (err) {

        dispatch({type:"AdminGetCourseFailure",payload:err.response.data.message})

    }

}
export const getAllUSers=() =>async(dispatch)=>{
   
    try{
        dispatch({type:"GetAllUsersRequest"})


        const {data}=await axios.get(`${server}/users/admin/users`,{
            withCredentials:true
        })

        dispatch({type:"GetAllUsersSuccess",payload:data.users})

    } catch (err) {

        dispatch({type:"GetAllUsersFailure",payload:err.response.data.message})

    }

}

export const deleteUsers=(id)=>async(dispatch)=>{
   
    try{
        dispatch({type:"DeleteUsersRequest"})


        const {data}=await axios.delete(`${server}/users/admin/users/${id}`,{
            withCredentials:true
        })

        dispatch({type:"DeleteUsersSuccess",payload:data.message})

    } catch (err) {

        dispatch({type:"DeleteUsersFailure",payload:err.response.data.message})

    }

}


export const getDashboardStats=() =>async(dispatch)=>{
   
    try{
        dispatch({type:"GetAdminStatsRequest"})


        const {data}=await axios.get(`${server}/admin/stats`,{
            withCredentials:true
        })

        dispatch({type:"GetAdminStatsSuccess",payload:data})

    } catch (err) {

        dispatch({type:"GetAdminStatsFailure",payload:err.response.data.message})

    }

}
export const requestCourse=(title,description) =>async(dispatch)=>{
   
    try{
        dispatch({type:"RequestCourseRequest"})


        const {data}=await axios.post(`${server}/request/course`,{title,description},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })

        dispatch({type:"RequestCourseSuccess",payload:data.message})

    } catch (err) {

        dispatch({type:"RequestCourseFailure",payload:err.response.data.message})

    }

}
export const getrequestCourse=(title,description) =>async(dispatch)=>{
   
    try{
        dispatch({type:"GetRequestCourseRequest"})


        const {data}=await axios.get(`${server}/request/course`,{
            withCredentials:true
        })

        dispatch({type:"GetRequestCourseSuccess",payload:data.request})

    } catch (err) {

        dispatch({type:"GetRequestCourseFailure",payload:err.response.data.message})

    }

}

export const deleterequestCourse=(id) =>async(dispatch)=>{
   
    try{
        dispatch({type:"DeleteRequestCourseRequest"})


        const {data}=await axios.delete(`${server}/request/course/${id}`,{
            withCredentials:true
        })

        dispatch({type:"DeleteRequestCourseSuccess",payload:data.message})

    } catch (err) {

        dispatch({type:"DeleteRequestCourseFailure",payload:err.response.data.message})

    }

}