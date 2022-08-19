import { Avatar, background, Box, Button, Container, Divider, Flex, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import {GiGraduateCap} from 'react-icons/gi'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { RegisterUser } from '../../Redux/Action/userAction'

const Register = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [name,setName]=useState("")
    const [avatar,setAvatar]=useState("")
    const [avatarPrev,setAvatarPrev]=useState("")
    const dispatch=useDispatch()
    const submitHandler=(e)=>{
        e.preventDefault();
        const myForm=new FormData()
         myForm.append("name",name)
         myForm.append("email",email)
         myForm.append("password",password)
         myForm.append("file",avatar)

         dispatch(RegisterUser(myForm))
    }

    const changeAvatarHandler=(e)=>{
        const file=e.target.files[0]
        const reader=new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend=()=>{
            setAvatarPrev(reader.result);
            setAvatar(file);

        }
    }

  return (
    <Flex  h={"100vh"} justifyContent="center"  alignItems="center">
    <VStack h={"85vh"} borderRadius={"20"} width="600px" justifyContent={"center"}  boxShadow="0px 3px 6px #00000029" spacing={"5"}>
       <Heading>
         REGISTRATION
       </Heading>
       <Divider />
       <form onSubmit={submitHandler} style={{width: '90%'}}>
       <Box my='4' display='flex' justifyContent={"center"}>
          <Avatar src={avatarPrev} size={"2xl"} />
       </Box>
       
       <Box marginY={"2"} width={"100%"}>
        <FormLabel htmlFor="name" children="Name"/>
        <Input required id="name" value={name} onChange={e=>setName(e.target.value)} placeholder="Email Address" type={"text"} w="full"/>  
        </Box>
       <Box my={'2'} width={"100%"}>
        <FormLabel htmlFor="email" children="Email Address"/>
        <Input required id="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email Address" type={"email"} w="full"/>  
        </Box>
        <Box>
        <FormLabel htmlFor="password" children="Password"/>
        <Input required id="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type={"password"}
           
        />  
        </Box>
        <Box my={'2'}>
        <FormLabel htmlFor="chooseAvatar" children="Choose a Avatar"/>
        <Input required id="chooseAvatar"  accept="image/*" type={"file"} 
             css={{
                "&::file-selector-button":{
                    cursor: "pointer",
                    marginLeft:"-5%",
                    width:"110%",
                    border:"none",
                    height:"100%",
                    color:"gray",
                    backgroundColor:"lightblue"
                }
            }}
            onChange={changeAvatarHandler}
        />  
        </Box>
        <Button my="2" colorScheme='blue' width={"full"} type={"submit"}>Sign Up</Button>
        <Box>
        Already Signed Up?{' '}
        <Link to="/login">
                <Button variant={"link"} fontSize={"sm"}>
                    Sign In
                </Button>{" "}
            </Link>

        </Box>
       </form>
     

    </VStack>

    </Flex>

  )
}

export default Register