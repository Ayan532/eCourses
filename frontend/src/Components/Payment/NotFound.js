import { Button, Container, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Container h="90vh" p={"16"}>
          <VStack   h="full" justifyContent="center" alignItems={"center"}  spacing="4">
            <Heading size="4xl">404</Heading>
            <Heading size="lg">Not Found</Heading>
            <Heading textAlign="center" size="xs">The resource requested could not found in this server</Heading>
            <Link to="/">
                <Button variant="ghost">Go to home</Button>
            </Link>
          </VStack>

    </Container>
  )
}

export default NotFound