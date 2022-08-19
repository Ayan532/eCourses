import React from 'react'
import { Button, Heading, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const TrendingCourse = ({id,views,title,imageSrc,creator,description,lectureCount}) => {
  return (
    <VStack className='course' p={"3"} marginBottom={"5"}
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
    </Stack>
    </VStack>
  )
}

export default TrendingCourse