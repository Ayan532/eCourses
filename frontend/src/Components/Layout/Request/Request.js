import { Box, Button,  Divider, Flex, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { requestCourse } from '../../../Redux/Action/adminAction'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const Request = ({user}) => {
    const [title,setTitle]=useState("")
    const [course,setCourse]=useState("")
    const {loading,error,message}=useSelector(state=>state.admin)
    const dispatch=useDispatch()
    useEffect(() => {
      if(error){
        toast.error(error)
        dispatch({type:"clearError"})
      }
      if(message){
        toast.success(message)
        dispatch({type:"clearMessage"})
      }
       
    }, [dispatch,error,message])
    const handleSubmit=(e)=>{
      e.preventDefault()
      dispatch(requestCourse(title,course))
        
    }
    if(user.role!=='admin' && (user.subscription===undefined || user.subscription.status!=='active')){

      return <Navigate to="/subscribe"/>
      
  }

  return (
    <Flex  h={"100vh"} justifyContent="center"  alignItems="center">
    <VStack h={"70vh"} borderRadius={"20"} width="600px" justifyContent={"center"}  boxShadow="0px 5px 8px #00000029" spacing={"10"}>
       <Heading>
         Request a Course
       </Heading>
       <Divider />
       <form onSubmit={handleSubmit} style={{width: '90%'}}>
       <Box marginY={"5"} width={"100%"}>
        <FormLabel htmlFor="email" children="Title"/>
        <Input required id="email" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" type={"text"} w="full"/>  
        </Box>
        <Box>
        <FormLabel htmlFor="course" children="Course"/>
        <Textarea required id="course" value={course} onChange={e=>setCourse(e.target.value)} placeholder="Explain the Course" type={"text"}/>  
        </Box>
        <Button my="5" isLoading={loading} colorScheme='blue' width={"full"} type={"submit"}>Request Course</Button>
        
       </form>


    </VStack>

    </Flex>

  )
}

export default Request