import { Avatar, Button, Container, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from '@chakra-ui/react'
import React,{useState} from 'react'

const ChangePasswordBox = ({isOpen,onClose,changeImageSubmitHandler,loading}) => {
    const [avatar,setAvatar]=useState("")
    const [avatarPrev,setAvatarPrev]=useState("")


    const changeImg=(e)=>{
        const file=e.target.files[0]
        const reader=new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend=()=>{
            setAvatarPrev(reader.result);
            setAvatar(file);

        }
    }
    const closeHandler=()=>{
        onClose()
        setAvatarPrev("");
        setAvatar("");
    }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter={"blur(10px)"}/>
        <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                <Container>
                    <form onSubmit={(e)=>changeImageSubmitHandler(e,avatar)}>
                        <VStack spacing={"8"}>
                        {
                            avatarPrev && (<Avatar  src={avatarPrev} boxSize={"48"}/>)
                        }
                        
                        <Input type={"file"}
                            css={{  "&::file-selector-button":{
                    cursor: "pointer",
                    marginLeft:"-5%",
                    width:"110%",
                    border:"none",
                    height:"100%",
                    color:"gray",
                    backgroundColor:"lightblue"
                }}}
                onChange={changeImg}
                        />
                         <Button w="full" type='submit'  isLoading={loading}>
                        
                            Change Photo
                         </Button>
                        </VStack>
                    </form>
                </Container>
            </ModalBody>
            <ModalFooter>
                <Button mr="3" onClick={closeHandler}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default ChangePasswordBox