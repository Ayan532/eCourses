import {  Button, Container, Grid, Heading, Image, Input, Select, Textarea, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { admincreateCourses } from '../../../Redux/Action/adminAction';
import Sidebar from '../layouts/Sidebar';
import {useDispatch, useSelector} from 'react-redux'
import toast from 'react-hot-toast';

const CreateCourse = () => {
  const [title,setTitle]=useState("")
  const [category,setCategory]=useState("")
  const [description,setDescription]=useState("")
  const [createdBy,setCreatedBy]=useState("")
  const [img,setImg]=useState("")
  const [imgPrev,setImgPrev]=useState("")
  const categories=["Web Development","Machine Learning","Devops","Data Structure & Algorithms","Data Science","Game Development",
  "App Development"]
  const {message,error,loading}=useSelector(state=>state.admin)

  const changeImgHandler=(e)=>{
    const file=e.target.files[0]
    const reader=new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend=()=>{
      setImgPrev(reader.result);
        setImg(file);

    }
}
const dispatch=useDispatch()
const submitHandler=(e)=>{
  e.preventDefault();
  const myForm=new FormData()
  myForm.append("title",title)
  myForm.append("description",description)
  myForm.append("category",category)
  myForm.append("createdBy",createdBy)
  myForm.append("file",img)
  console.log(myForm);
  dispatch(admincreateCourses(myForm))

}
useEffect(() => {
  if(error){
    toast.error(error)
    dispatch({type:"clearError"})
  }
  if(message){
    toast.success(message)
    dispatch({type:"clearMessage"})
    setTitle('')
    setDescription('')
    setCategory('')
    setCreatedBy('')
    
  }
}, [dispatch,error,message])



  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '5fr 1fr']}>
      <Container  boxShadow={"-2px 0 10px rgba(107,70,193,0.5)"} borderRadius="lg" py="16">
        <form onSubmit={submitHandler}>
          <Heading
            textAlign="center"
            textTransform="uppercase"
            children="Create Course"
            my="16"
          />
          <VStack m="auto" spacing="8">
            <Input
              required
              id="name"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              type={'text'}
              w="full"
              focusBorderColor="purple.300"
            />
            <Textarea
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              type={'text'}
              w="full"
              focusBorderColor="purple.300"
            />
            <Input
              required
              id="name"
              value={createdBy}
              onChange={e => setCreatedBy(e.target.value)}
              placeholder="Creator Name"
              type={'text'}
              w="full"
              focusBorderColor="purple.300"
            />
            <Select
              focusBorderColor="purple.300"
              value={category}
              onChange={(e) => setCategory(e.target.value)}>
                <option color='gray' default disabled value="">Category</option>
                {
                  categories.map((item)=>(

                    <option key={item} value={item}>{item}</option>

                  ))
                }

              </Select>
              <Input required id="chooseAvatar"  accept="image/*" type={"file"} focusBorderColor="purple.300"
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
            onChange={changeImgHandler}
        />  
        {
          imgPrev && (<Image src={imgPrev} boxSize="64" objectFit={"contain"}/>)
        }
        <Button isLoading={loading} w="full" type='submit' focusBorderColor="purple.300">Create Course</Button>
          </VStack>
        </form>
      </Container>
      <Sidebar />
    </Grid>
  );
};

export default CreateCourse;
