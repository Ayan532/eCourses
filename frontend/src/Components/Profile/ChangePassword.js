import { Box, Button, Divider, Flex, FormLabel, Heading, Input, Toast, VStack } from '@chakra-ui/react'
import React,{useEffect, useState} from 'react'
import toast,{Toaster} from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changePassword, LoadUser } from '../../Redux/Action/userAction'
const ChangePassword = () => {
    const [oldPassword,setoldPassword]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {loading,message,error}=useSelector(state=>state.profile)
    const handleSubmit=async(e)=> {
     e.preventDefault();
     if(newPassword!==confirmPassword){
      return toast.error("New passord and Confirm Password does not match")
     }

     await dispatch(changePassword(oldPassword,newPassword))
     dispatch(LoadUser())
     navigate('/me')

    }

    useEffect(() => {
      if(error){
        toast.error(error)
        dispatch({type:"clearError"})
      }
      if(message){
        toast.success(message)
        dispatch({type:"clearMessage"})
      }
    
    }, [error,message,dispatch])
    
  return (
     <Flex  h={"90vh"} justifyContent="center"  alignItems="center">
     <VStack h={"75vh"} borderRadius={"20"} p={"8"} width="600px" justifyContent={"center"}  spacing={"10"} boxShadow="0px 5px 8px #00000029">
      <form onSubmit={handleSubmit} style={{width: '100%'}}>
        <Heading children="Change Password" textTransform={"uppercase"} my={"16"} textAlign={['center', 'left']}/>
        <Divider/>
      
        <Box my={"4"}>
        <FormLabel htmlFor="oldpassword" children="Old Password"/>
        <Input required id="oldpassword" w="full" value={oldPassword} onChange={e=>setoldPassword(e.target.value)} placeholder="Enter Old Password" type={"password"}/>  
        </Box>
        <Box my={"4"}>
        <FormLabel htmlFor="newpassword" children="New Password"/>
        <Input required id="newpassword" w="full" value={newPassword} onChange={e=>setNewPassword(e.target.value)} placeholder="Enter a New Password" type={"password"}/>  
        </Box>
        <Box my={"4"}>
        <FormLabel htmlFor="confirmpassword" children="Confirm Password"/>
        <Input required id="confirmnewpassword"  w="full" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} placeholder="Confirm Password" type={"password"}/>  
        </Box>  
        <Button my="5" isLoading={loading} mb="5" colorScheme='blue' width={"full"} type={"submit"}>Change Password</Button>
       
         <Toaster/>
      </form>

     </VStack>
     </Flex>

  )
}

export default ChangePassword