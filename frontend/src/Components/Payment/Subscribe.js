import { Box, Container,Flex,Heading, VStack,Text, Button } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {GiGraduateCap} from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import { buySubscription } from '../../Redux/Action/subscriptionAction'
import { server } from '../../Redux/store'
import bg from '../../Assets/img/newbg.jpg'
const Subscribe = ({user}) => {

  const dispatch=useDispatch()
  const [key,setKey]=useState("")
  const {loading,error,subscriptionId}=useSelector(state=>state.subscription)
  const {error:courseError}=useSelector(state=>state.courses)
  
  const subscribeHandler=async()=>{

   const {data} =await axios(`${server}/plan/razorpaykey`)
   setKey(data.key)

   dispatch(buySubscription())

  }

  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch({type:"clearError"})
    }
    if(courseError){
      toast.error(courseError)
      dispatch({type:"clearError"})
    }
    if(subscriptionId){
      const openPopUp=()=>{
       const options={
        key,
        name:"eCourses",
        description:"Get Access to All Premium Courses for free",
        subscription_id:subscriptionId,
        image:bg,
        callback_url: `${server}/plan/payment/verfication`,
        "prefill": {
          "name": user.name,
          "email": user.email,
          
        },
       }

       const razorpay=new window.Razorpay(options)
       razorpay.open()
      }
      openPopUp()
    }
  }, [error,dispatch,user.name,user.email,key,subscriptionId,courseError])
  

  return (
    <Container h="90vh" p={"16"}>
    <Heading textAlign="center" my={"8"}>
    <Flex justifyContent="center" alignItems={'center'} >
           Welcome to  
            <GiGraduateCap/>
            eCourses
            </Flex>
    </Heading>
    <VStack boxShadow={"lg"} alignItems={"stretch"} borderRadius={"lg"} spacing="0">
    <Box bg={"yellow.300"} p={"4"} css={{borderRadius:"8px 8px 0 0"}}>
        <Text children={` Pro Pack -  ₹299 `} textAlign="center"/>
     </Box>
     <Box p={"4"}>
      <VStack textAlign="center" px="8" mt={"4"} spacing={"8"}>
      <Text children={`Join pro pack and get access to all content `}/>
      <Heading  size="md" children={`₹299 only `}/>
      </VStack>
      <Button w="full"  isLoading={loading} my="4" colorScheme='yellow' onClick={subscribeHandler}>Subscribe Now</Button>
     </Box>
     <Box bg={"blackAlpha.600"} p={"4"} css={{borderRadius:"8px 8px 0 0"}}>
         <Heading color='white' size="sm" children={`100% Refend at Cancellation `}  textTransform={"uppercase"}/>
     </Box>
    </VStack>

    </Container>
  )
}

export default Subscribe