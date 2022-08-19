import { Box, Button, Grid, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import VideoCard from './VideoCard'

const CourseModal = ({id,isOpen,onClose,courseTitle,deleteCourseHandler,addlectureHandler,lectures,loading}) => {
  const[title,setTitle] =useState("")
  const[videoPrev,setVideoPrev] =useState("")
  const[description,setDescription] =useState("")
  const[video,setVideo] =useState("")

   const changeVideoHandler=(e)=>{
    const file=e.target.files[0]
    const reader=new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend=()=>{
      setVideoPrev(reader.result);
        setVideo(file);

    }
   }
   const handleClose=()=>{
    setTitle('')
    setDescription('')
    setVideo('')
    setVideoPrev('')
    onClose()
   }
  return (
     <Modal isOpen={isOpen} size="full" onClose={handleClose} scrollBehavior="inside">
       <ModalOverlay/>
       <ModalContent>
          <ModalHeader>{courseTitle}</ModalHeader>
          <ModalCloseButton/>
          <ModalBody p="16">
           <Grid templateColumns={['1fr','3fr 1fr']}>
                <Box px={['0','16']}>
                  <Box my="5">
                    <Heading children={courseTitle}/>
                    <Heading children={`${id}`} size="sm" opacity={"0.4"}/>
                  </Box>
                  <Heading children={"Lectures"} size="lg"/>
                 {
                  lectures.map((item,i)=>(
                    <VideoCard 
                     key={i}
                    title={item.title}
                    description={item.description}
                    num={i+1}
                    lectureId={item._id}
                    courseId={id}
                    deleteCourseHandler={deleteCourseHandler}
                    loading={loading}
                  />
                  ))
                 }

                </Box>
                <Box>
                  <form onSubmit={e=>addlectureHandler(e,id,title,description,video)}>
                    <VStack spacing="4">
                      <Heading children="Add Lectures" size="md" textTransform={"uppercase"} />
                      <Input focusBorderColor='purple.300' placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
                      <Textarea focusBorderColor='purple.300' placeholder='Description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
               <Input required id="chooseAvatar"  accept="video/*" type={"file"} focusBorderColor="purple.300"
                css={{
                "&::file-selector-button":{
                    cursor: "pointer",
                    marginLeft:"-5%",
                    width:"110%",
                    border:"none",
                    height:"100%",
                    color:"gray",
                   
                }
            }}
            onChange={changeVideoHandler}
        />  
        {
          videoPrev && (<video src={videoPrev} controlsList="nodownload" controls/>)

        }    
          <Button w="full" isLoading={loading} type="submit">Upload</Button>
          
                    </VStack>
                    

                  </form>
                </Box>
           </Grid>

          </ModalBody>

          <ModalFooter>
            <Button onClick={handleClose}>Close</Button>
          </ModalFooter>

       </ModalContent>
        
     </Modal>
  )
}

export default CourseModal