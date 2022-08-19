import { Box, Button, Container, Divider, Flex, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import {GiGraduateCap} from 'react-icons/gi'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { loginUser } from '../../Redux/Action/userAction'
const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const dispatch=useDispatch()

    const loginHandler=(e)=>{
        e.preventDefault();
        dispatch(loginUser(email,password))
    }
  return (
    <Flex  h={"100vh"} justifyContent="center"  alignItems="center">
    <VStack h={"70vh"} borderRadius={"20"} width="600px" justifyContent={"center"}  boxShadow="0px 5px 8px #00000029" spacing={"10"}>
       <Heading>
       <Flex justifyContent="center" alignItems={'center'}>
           Welcome to  
            <GiGraduateCap/>
            eCourses
            </Flex>
       </Heading>
       <Divider />
       <form onSubmit={loginHandler} style={{width: '90%'}}>
       <Box marginY={"5"} width={"100%"}>
        <FormLabel htmlFor="email" children="Email Address"/>
        <Input required id="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email Address" type={"email"} w="full"/>  
        </Box>
        <Box>
        <FormLabel htmlFor="password" children="Password"/>
        <Input required id="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type={"password"}/>  
        </Box>
        <Box>
            <Link to="/forgetpassword">
                <Button variant={"link"} fontSize={"sm"}>
                    Forget Password?
                </Button>
            </Link>
        </Box>
        
        <Button my="5" colorScheme='blue' width={"full"} type={"submit"}>Sign In</Button>
        
        <Box>
        New User?{' '}
        <Link to="/register">
                <Button variant={"link"} fontSize={"sm"}>
                    Sign Up
                </Button>{" "}
                Here
            </Link>

        </Box>
       </form>
     

    </VStack>

    </Flex>

  )
}

export default Login