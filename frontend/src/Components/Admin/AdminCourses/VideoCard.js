import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'

const VideoCard = ({title,num,description,lectureId,courseId,deleteCourseHandler,loading}) => {
  return (
    <Stack direction={['column', 'row']} my="8" borderRadius={"lg"} boxShadow={"-2px 0 10px rgba(107,70,193,0.5)"} justifyContent={['flex-start',"space-between"]} p={['4','8']}>
        <Box>
            <Heading size="sm" children={`${num} ${title}`} />
            <Text children={description} />
        </Box>
        <Button  isLoading={loading} onClick={()=>deleteCourseHandler(courseId,lectureId)}>
            <RiDeleteBinLine/>
        </Button>
    </Stack>
  )
}

export default VideoCard