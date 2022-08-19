import axios from "axios";
import { server } from '../store'

export const getAllCourses=(category='', keyword='',currentPage=1)=>async(dispatch)=>{
   
    try{
        dispatch({type:"AllCourseRequest"})


        const {data}=await axios.get(`${server}/courses?keyword=${keyword}&category=${category}&page=${currentPage}`)

    
        dispatch({type:"AllCourseSuccess",payload:data})

    } catch (err) {

        dispatch({type:"AllCourseFailure",payload:err.response.data.message})

    }

}
export const getTrendingCourses=()=>async(dispatch)=>{
   
    try{
        dispatch({type:"TrendingCourseRequest"})


        const {data}=await axios.get(`${server}/courses/trendingcourse`)

        dispatch({type:"TrendingCourseSuccess",payload:data.trending})

    } catch (err) {

        dispatch({type:"TrendingCourseFailure",payload:err.response.data.message})

    }

}

export const getCoursesLectures=(id)=>async(dispatch)=>{
   
    try{
        dispatch({type:"CourseLecturesRequest"})


        const {data}=await axios.get(`${server}/courses/${id}`,{
            withCredentials:true
        })


        dispatch({type:"CourseLecturesSuccess",payload:data.courses})

    } catch (err) {

        dispatch({type:"CourseLecturesFailure",payload:err.response.data.message})

    }

}
export const removeToPlaylist=(id)=>async(dispatch)=>{
   
    try{
        dispatch({type:"RemoveToPlaylistRequest"})
       
         

        const {data}=await axios.delete(`${server}/users/removeplaylist?id=${id}`,{
            withCredentials:true
        })

 
        dispatch({type:"RemoveToPlaylistSuccess",payload:data.message})

    } catch (err) {

        dispatch({type:"RemoveToPlaylistFailure",payload:err.response.data.message})

    }

}
export const addToPlaylist=(id)=>async(dispatch)=>{
   
    try{
        dispatch({type:"AddToPlaylistRequest"})


        const {data}=await axios.post(`${server}/users/addtoplaylist`,{id},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })

    
        dispatch({type:"AddToPlaylistSuccess",payload:data})

    } catch (err) {

        dispatch({type:"AddToPlaylistFailure",payload:err.response.data.message})

    }

}