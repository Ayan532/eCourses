import { Box, Button, Divider, Flex, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React,{useEffect, useState} from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../../Redux/Action/userAction'

const ResetPassword = () => {
    const [password,setNewPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const {loading,message,error}=useSelector(state=>state.profile)
    const dispatch=useDispatch()
    const params=useParams()
    const navigate=useNavigate()

    const submitHandler=(e)=>{
      e.preventDefault()
      dispatch(resetPassword(params.token,password,confirmPassword))
    
    }

    useEffect(() => {
      if(error){
        toast.error(error)
        dispatch({type:"clearError"})
      }
      if(message){
        toast.success(message)
        dispatch({type:"clearMessage"})
         navigate('/login')
      }
    
    }, [error,message,dispatch,params,navigate])
  return (
     <Flex  h={"90vh"} justifyContent="center"  alignItems="center">
     <VStack h={"60vh"} borderRadius={"20"} p={"8"} width="600px" justifyContent={"center"}  spacing={"10"} boxShadow="0px 5px 8px #00000029">
      <form onSubmit={submitHandler} style={{width: '100%'}}>
        <Heading children="Reset Password" textTransform={"uppercase"} my={"16"} textAlign={['center', 'left']}/>
        <Divider/>
      
        <Box my={"4"}>
        <FormLabel htmlFor="newpassword" children="New Password"/>
        <Input required id="newpassword" w="full" value={password} onChange={e=>setNewPassword(e.target.value)} placeholder="Enter a New Password" type={"password"}/>  
        </Box>
        <Box my={"4"}>
        <FormLabel htmlFor="confirmpassword" children="Confirm Password"/>
        <Input required id="confirmnewpassword"  w="full" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} placeholder="Confirm Password" type={"password"}/>  
        </Box>  
        <Button my="5" isLoading={loading} colorScheme='blue' width={"full"} type={"submit"}>Update Password</Button>
       
         
      </form>

     </VStack>
     </Flex>

  )
}

export default ResetPassword