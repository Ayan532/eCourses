import { Button, Container, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import {ImCross} from 'react-icons/im'
const PaymentFail = () => {
  return (
    <Container h="90vh" p={"16"}>
          <VStack   h="full" justifyContent="center" alignItems={"center"}  spacing="4">
            <Heading size="4xl" rounded={"full"} bg="red">
                <ImCross />
            </Heading>
            <Heading size="2xl" textTransform={"uppercase"}>Payment Fail</Heading>
            <Heading textAlign="center" size="xs"></Heading>
            <Link to="/subscribe">
                <Button variant="ghost">Try Again</Button>
            </Link>
          </VStack>

    </Container>
  )
}

export default PaymentFail