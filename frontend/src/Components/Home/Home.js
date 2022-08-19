import React, { useEffect } from 'react'
import {Box, Button, Heading,Image, Stack, Text, VStack} from '@chakra-ui/react'
import bg from '../../Assets/img/newbg.jpg'
import {Link} from 'react-router-dom';
import './Home.css'
import TrendingCourse from '../Layout/TrendingCourse/TrendingCourse';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getTrendingCourses } from '../../Redux/Action/courseAction';
const Home = () => {
  const dispatch= useDispatch()
  const{error, message,trending} =useSelector(state=>state.courses)
  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch({type:"clearError"})
    }
    if(message){
      toast.success(message)
      dispatch({type:"clearMessage"})
    }
    dispatch(getTrendingCourses())
     
  }, [dispatch,error,message])

  
  return (
    <section className='home'>
        <div className="container">
        <Stack
         direction={['column','column','row']}
         height="100%"
         width={"full"}
         justifyContent={["center","center","space-between"]}
         alignItems='center'
         spacing={["16","20","50"]}
         zIndex={"-1"}
         
        >
        <Image className="banner" boxSize={['sm','sm','sm','md']} src={bg}  objectFit="contain"/>
        <VStack width={"full"} alignItems={['center','center','flex-end']} spacing={"5"}>
        <Heading  size={['lg','lg','xl']} >
        LEARN SOMETHING NEW EVERY DAY.
        </Heading>
        <Text fontSize={"20"}  >
            Find Valuable Courses At Reasonable Price.
        </Text>
        <Link to='/courses' >
            <Button  size={"lg"}   colorScheme='blue' mb={"20"} rounded={"10"}>
                Explore Now
            </Button>
        </Link>
        </VStack>            
        </Stack>
        </div>
        <div className="container2">
        <Box padding={'4'}   w={"full"}>
        <Heading
          textAlign={'center'}
          fontFamily="body"
          children="TRENDING COURSES"
          w={"full"}
        />
       
        <Stack
          className="brandsBanner"
          justifyContent={['center','center','space-evenly']}
          alignItems={['center','center','space-evenly']}
          marginTop="4"
          overflow={"auto"} paddingY={"8"} css={{"&::-webkit-scrollbar":{display: "none"}}}
          direction={['column','column', 'row']}
        >
            {
              trending && trending.map((items)=>(
                <TrendingCourse
                  key={items._id}
                  id={items._id}
                  views={items.views}
                  title={items.title}
                  imageSrc={items.poster.url}
                  creator={items.createdBy}
                  description={items.description}
                  lectureCount={items.noOfVideos}

                />
              ))
            }
         

        </Stack>
        </Box>
        </div>
    
    </section>
  )
}

export default Home