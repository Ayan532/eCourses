import { Box, Button, Grid, Heading, HStack,Image,Table, TableCaption, TableContainer, Tbody, Td, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { RiDeleteBinLine, RiEyeFill } from 'react-icons/ri'
import { useDispatch,  useSelector } from 'react-redux'
import { admincreateCoursesLectures, admindeleteCoursesLectures, deleteCourses, getadminCourses } from '../../../Redux/Action/adminAction'
import {  getCoursesLectures } from '../../../Redux/Action/courseAction'
import Sidebar from '../layouts/Sidebar'
import CourseModal from './CourseModal'
const AdminCourses = () => {
  const{ isOpen, onOpen, onClose}= useDisclosure();
  const [courseId,setCourseId]=useState("")
  const [courseTitle,setCourseTitle]=useState("")
  const {lectures}=useSelector(state=>state.courses)
  const {loading,error,message,courses}=useSelector(state=>state.admin)
  const dispatch=useDispatch()
const courseDetailHandler=(courseId,title)=>{
  dispatch(getCoursesLectures(courseId))
  onOpen()
  setCourseId(courseId)
  setCourseTitle(title)
}
const deleteHandler=(courseId)=>{
  dispatch(deleteCourses(courseId))
}
const deleteCourseHandler=async(courseId,lectureId)=>{
 await dispatch(admindeleteCoursesLectures(courseId,lectureId))
 dispatch(getCoursesLectures(courseId))
}
const addlectureHandler=async(e,courseId,title,description,video)=>{
  e.preventDefault();
  const myForm=new FormData()
  myForm.append("title",title)
  myForm.append("description",description)
  myForm.append("file",video)

  await dispatch(admincreateCoursesLectures(courseId,myForm))
  dispatch(getCoursesLectures(courseId))

 


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

  dispatch(getadminCourses())
   
 }, [dispatch,error,message])
 
  return (
    <Grid  minH={"100vh"} templateColumns={['1fr','5fr 1fr']}>
        <Box  p={["0","8"]} overflowX={"auto"}>
         <Heading textAlign="center"  children="All Users" my="16"/>
         <TableContainer boxShadow={"-2px 0 10px rgba(107,70,193,0.5)"} style={{cursor: "pointer"}} borderRadius={"20px"} w={["100vw","full"]}>
          <Table variant={"simple"} size="lg">
            <TableCaption>All Avaliable Courses</TableCaption>
            <Thead>
            <Tr>
              <Td>Id</Td>
              <Td>Poster</Td>
              <Td>Title</Td>
              <Td>Category</Td>
              <Td>Creator</Td>
              <Td isNumeric>Views</Td>
              <Td isNumeric>Lectures</Td>
              <Td isNumeric>Action</Td>
              </Tr>
              </Thead>
              <Tbody>
                {
                  courses.map((items)=>(
                    <Row key={items._id} deleteHandler={deleteHandler} courseDetailHandler={courseDetailHandler} item={items} loading={loading}/>

                  ))
                }
              </Tbody>
          </Table>
         </TableContainer>
         <CourseModal isOpen={isOpen} onClose={onClose}
          courseTitle={courseTitle}
          id={courseId}
          deleteCourseHandler={deleteCourseHandler}
          addlectureHandler={addlectureHandler}
          lectures={lectures}
          loading={loading}
         />
        </Box>
        <Sidebar/>
    </Grid>
  )
}

function Row({item,deleteHandler,courseDetailHandler,loading}){
  return (
    <Tr>
        <Td>{item._id}</Td>
        <Td>
          <Image src={item.poster.url}/>
        </Td>
        <Td>{item.title}</Td>
        <Td textTransform={"uppercase"}>{item.category}</Td>
        <Td >{item.createdBy}</Td>
        <Td isNumeric>{item.views}</Td>
        <Td isNumeric>{item.noOfVideos}</Td>
        <Td isNumeric>
             <HStack justifyContent={"flex-end"}> 
             <Button isLoading={loading} variant="ghost" onClick={()=>courseDetailHandler(item._id,item.title)}>
             <RiEyeFill/>
             </Button> 
             <Button isLoading={loading} onClick={()=>deleteHandler(item._id)}>
                    <RiDeleteBinLine/>
                </Button>
              </HStack>
        </Td>
    </Tr>
  )
}


export default AdminCourses