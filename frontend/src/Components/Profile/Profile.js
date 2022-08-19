import { Avatar, Button, Container, Heading, HStack, Stack, VStack ,Text, Divider, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter} from '@chakra-ui/react'
import React,{useEffect, useState} from 'react'
import toast from 'react-hot-toast';
import { VscChromeClose } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { removeToPlaylist } from '../../Redux/Action/courseAction';
import { cancelSubscription } from '../../Redux/Action/subscriptionAction';
import { deleteProfile, LoadUser, updateProfilePicture } from '../../Redux/Action/userAction';
import ChangePasswordBox from '../Layout/ChangePasswordBox/ChangePasswordBox';

const Profile = ({user}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [open,setOpen]=useState(false)
    const dispatch=useDispatch()
    const {loading,message,error}=useSelector(state=>state.profile)
    const {loading:subLoading,message:subMessage,error:subError}=useSelector(state=>state.subscription)


    const handleDeleteProfile=async()=>{
       
      await dispatch(deleteProfile())

    }

    const changeImageSubmitHandler=async(e,image)=>{
        e.preventDefault();
        const myForm=new FormData()
        myForm.append("file",image)

       await dispatch(updateProfilePicture(myForm))
       
     
        

    }
    const cancelSubscriptionHandler=()=>{
      dispatch(cancelSubscription())
    }

    useEffect(() => {

        if(error){
          toast.error(error)
          dispatch({type:"clearError"})
        }
        if(message){
            console.log("Working");
          toast.success(message)
          dispatch({type:"clearMessage"})
          dispatch(LoadUser())
        }
        if(subError){
          toast.error(subError)
          dispatch({type:"clearError"})
        }
        if(subMessage){
          toast.success(subMessage)
          dispatch({type:"clearMessage"})
          dispatch(LoadUser())
        }
      
      }, [error,message,dispatch,subMessage,subError])

    const handleDeletePlaylist=async id=>{
        await dispatch(removeToPlaylist(id))
        dispatch(LoadUser())
    }
  return (
    <Container minH={"95vh"} maxW="container.lg" py="8" >
    <Heading textTransform={"uppercase"}/>
    <Stack direction={['column', 'row']}
    justifyContent={"flex-start"}
    alignItems={"center"}
    spacing={['8','16']}
    p="8">
    <VStack>
        <Avatar src={user.avatar.url} boxSize={"48"}/>
        <Button onClick={onOpen} colorScheme='blue' variant="ghost">Change Photo</Button>
    </VStack>
    <VStack
    spacing={"4"}
    alignItems={["center",'flex-start']}>
         <HStack>
            <Text children="Name :" fontWeight={"bold"}/>
            <Text children={user.name}/>
         </HStack>
         <HStack>
         <Text children="Email :" fontWeight={"bold"}/>
            <Text children={user.email} />
         </HStack>
         <HStack>
         <Text children="Created At :" fontWeight={"bold"}/>
            <Text children={user.createdAt.split('T')[0]} />
         </HStack>
         {
            user.role!=='admin' && (
                <HStack>
                <Text children="Subcription :" fontWeight={"bold"}/>
                {
                    user.subscription && user.subscription.status==='active'?(
                        <Button  isLoading={subLoading} onClick={cancelSubscriptionHandler}>
                            Cancel Subcription
                        </Button>
                    ):
                    (<Link to="/subscribe">
                            <Button colorScheme='red'>
                             Subscribe Now  
                            </Button>
                    </Link>)
                }
                 
                </HStack>

            )
         }
    <Stack direction={['column', 'row']}
    alignItems={"center"}>
     <Link to="/updateprofile">
        <Button>Update Profile</Button>
     </Link>
     <Link to="/changepassword">
        <Button>Change Password</Button>
     </Link>
     {/* <Link to="/delete/me"> */}
     <Button isLoading={loading} onClick={()=>setOpen(!open)} colorScheme='red'>Delete Profile</Button>
     {/* </Link> */}

    </Stack>
    </VStack>
    </Stack>
    <Divider />
    <Heading  size="md" children="Playlists"/>
    {
        user.playlist.length > 0 && (
    <Stack direction={['column', 'row']} alignItems={"center"}  flexWrap="wrap" p="4">
      {
        user.playlist.map((element, index)=>(
            <VStack w="48" m="2" key={element.course} boxShadow={"lg"} borderRadius={"lg"}>
             <Image borderRadius={"lg"} boxSize={"full"} objectFit="contain" src={element.poster}/>
            <HStack>
                <Link to={`/course/${element.course}`}>
                 <Button variant="ghost">Watch Now</Button>
                </Link>
                <Button  onClick={()=>handleDeletePlaylist(element.course)} variant="ghost">
                    <VscChromeClose/>
                </Button>
            </HStack>
            </VStack>

        ))
      }
    </Stack>
        )
    }
    <ChangePasswordBox isOpen={isOpen} onClose={onClose} loading={loading} changeImageSubmitHandler={changeImageSubmitHandler}/>
    <Modal
        isCentered
        isOpen={open}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure you want to delete your profile?</ModalHeader>
          <ModalCloseButton textAlign={"center"}  onClick={()=>setOpen(!open)}/>
          <ModalBody>
            <Divider />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={()=>setOpen(!open)}>
              No
            </Button>
            <Button colorScheme='red' isLoading={loading} onClick={handleDeleteProfile} >Yes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default Profile