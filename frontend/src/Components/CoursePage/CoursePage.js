import {Box, Grid, Heading,Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'

import { getCoursesLectures } from '../../Redux/Action/courseAction'
import Loader from '../Layout/Loader/Loader'
const CoursePage = ({user}) => {
    const [lectureNumber,setLectureNumber]=useState(0)
    const dispatch=useDispatch()
    const params=useParams()
    console.log(params.id);
    const {lectures,loading}=useSelector(state=>state.courses)
    useEffect(() => {
      dispatch(getCoursesLectures(params.id))
   
  
    }, [dispatch, params.id])

    if(user.role!=='admin' && (user.subscription===undefined || user.subscription.status!=='active')){

        return <Navigate to="/subscribe"/>
        
    }
    
  return (
      loading?(<Loader/>):(
        <Grid  minH={"95vh"}  templateColumns={['1fr','3fr 1fr']} >
         {
            lectures && lectures.length > 0 ?
            (<>
                <Box mt={"16"}>
            <video
            width={"100%"}
            controls
            controlsList='nodownload'
            disableRemotePlayback
            disablePictureInPicture
            src={lectures[lectureNumber].video.url}
            >
            </video>
            <Heading m="4" children={`${lectureNumber+1}) ${lectures[lectureNumber].title}`}/> 
             <Heading size={"md"} m="4" children={`Description`}/>
            <Text  m="4" children={lectures[lectureNumber].description} />
        </Box>
        <VStack mt={"14"}>
            {
                lectures.map((element,index)=>(
                    <button
                    onClick={()=>setLectureNumber(index)}
                    style={{width:"100%",
                       padding:"1rem",
                       textAlign:"center",
                       margin:0,
                       borderBottom:"1px solid rgba(0,0,0,0.2)"
                    }}
                    key={element._id}>
                    <Text noOfLines={1}>
                        { index+1 }{". "}{element.title}
                    </Text>
                    </button>
                ))
            }
        </VStack>
            </>):(<Heading children="No Lectures Added yet"/>)
         }
    
        </Grid>
      )

  )
}

export default CoursePage