import { Box, Heading, HStack, Stack, useColorModeValue, VStack } from '@chakra-ui/react';
import React from 'react';
import { DiGithub } from 'react-icons/di';
const Footer = () => {
  return (
    <Box padding={'4'} bg={useColorModeValue('blackAlpha.800', 'blackAlpha.800')} >
      <Stack direction={['column', 'row']} justifyContent="flex-end">
        <VStack alignItems={['center', 'flex-start']} width="full">
          <Heading children="All Rights Reserved" size={"md"} color={'white'} />
          <Heading
            fontFamily={'body'}
            size="sm"
            children="eCourses"
            color={'white'}
          />
        </VStack>

        <HStack
          spacing={['2', '10']}
          justifyContent="center"
          color={'white'}
          fontSize="50"
        >
        
          <a href="https://github.com/Ayan532" target={'blank'}>
            <DiGithub />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
