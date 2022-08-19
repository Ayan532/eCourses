
import { Box, Grid, Heading, Table, TableCaption, TableContainer, Tbody, Td, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { deleterequestCourse, getrequestCourse } from '../../../Redux/Action/adminAction'
import Sidebar from '../layouts/Sidebar'
import Row from './Row'
const AdminRequest = () => {
    const {request,message,error,loading}=useSelector(state=>state.admin)
    const dispatch=useDispatch()
    useEffect(() => {
        if(error){
          toast.error(error)
          dispatch({type:"clearError"})
        }
        if(message){
          toast.success(message)
          dispatch({type:"clearMessage"})
          
        }
       dispatch(getrequestCourse())
      }, [dispatch,error,message]);
      const deleteHandler=(id)=>{
        dispatch(deleterequestCourse(id))
       }
  return (
    <Grid  minH={"100vh"} templateColumns={['1fr','5fr 1fr']}>
          <Box p={["0","16"]} overflowX={"auto"}>
         <Heading textAlign="center"  children="All Request" my="16"/>
         <TableContainer boxShadow={"-2px 0 10px rgba(107,70,193,0.5)"} style={{cursor: "pointer"}} borderRadius={"20px"} w={["100vw","full"]}>
          <Table variant={"simple"} size="lg">
            <TableCaption>All Avaliable Request</TableCaption>
            <Thead>
            <Tr>
              <Td>Id</Td>
              <Td>Name</Td>
              <Td>Email</Td>
              <Td>Title</Td>
              <Td>Description</Td>
              <Td isNumeric>Action</Td>
              </Tr>
              </Thead>
              <Tbody>
                {
                 request && request.map((items)=>(
                    <Row key={items._id} deleteHandler={deleteHandler} item={items} loading={loading}/>

                  ))
                }
              </Tbody>
          </Table>
         </TableContainer>
        </Box>
  
        <Sidebar/>
    </Grid>
  )
}

export default AdminRequest