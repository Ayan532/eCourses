import { Button, Heading, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import {MdFavoriteBorder} from 'react-icons/md'
import { Link } from 'react-router-dom'

const CourseCard = ({id,views,title,imageSrc,addtoPlaylist,creator,description,lectureCount,loading}) => {
 
  return (
    
    <VStack className='course' p={"3"} marginBottom={"10"}
    alignItems={['center','flex-start']}>
   <Link to={`/course/${id}`}>
    <Image src={imageSrc}   objectFit="contain" borderRadius='20px'/>
    </Link>
    <Heading textAlign={['center','left']} maxW="200px" fontFamily={"sans-serif"} size="sm" noOfLines={3} children={title}/>
    <Text  noOfLines={2} children={description}/>
    <HStack>
    <Text  fontWeight="bold" textTransform={"uppercase"} children={"Creator"}/>
    <Text  fontFamily={"body"} children={creator}/>
    </HStack>
    <Heading textAlign="center" size="xs" children={`Lectures- ${lectureCount}`} textTransform="uppercase"/>
    <Heading  size="xs" children={`Views- ${views}`} textTransform="uppercase"/>
  
    <Stack direction={['column', 'row']} alignItems="center" >
    <Link to={`/course/${id}`}>    
          <Button colorScheme='gray' borderRadius="20px">
          Watch Now
          </Button>
    </Link>
    <Button variant={"ghost"} borderRadius="20px" colorScheme='blue' isLoading={loading} onClick={()=>addtoPlaylist(id)} >Add to Playlist</Button>

    </Stack>
    </VStack>
  )
}

export default CourseCard