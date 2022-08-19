import { Button, Divider, Flex, Heading, Input, VStack } from '@chakra-ui/react'
import React,{useEffect, useState} from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { forgetPassword } from '../../Redux/Action/userAction'

const ForgetPassword = () => {
    const [email,setEmail]=useState("")
    const dispatch=useDispatch()
    const {loading,message,error}=useSelector(state=>state.profile)
    const submitHandler=(e)=>{
      e.preventDefault()
      dispatch(forgetPassword(email))

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
     <VStack h={"40vh"} borderRadius={"20"} width="600px" justifyContent={"center"}  boxShadow="0px 5px 8px #00000029">
      <form  onSubmit={submitHandler} style={{width: '90%'}}>
        <Heading children="Forget Password" textTransform={"uppercase"} my={"16"} textAlign={['center', 'left']}/>
        <Divider/>
        <VStack spacing={"8"}>
        <Input required  value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email Address" type={"email"} w="full"/>  
        <Button my="5" isLoading={loading} colorScheme='blue' width={"full"} type={"submit"}>Send Link</Button>
        </VStack>
         
      </form>

     </VStack>
     </Flex>

  )
}

export default ForgetPassword