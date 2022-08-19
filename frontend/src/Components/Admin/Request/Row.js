import { Button, Td, Tr } from '@chakra-ui/react'
import React from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'

const Row = ({item,deleteHandler,loading}) => {
  return (
    <Tr>
        <Td>{item._id}</Td>
        <Td>{item.name}</Td>
        <Td>{item.email}</Td>
        <Td>{item.title}</Td>
        <Td>{item.description}</Td>
        <Td isNumeric>
            
                <Button  isLoading={loading} onClick={()=>deleteHandler(item._id)}>
                    <RiDeleteBinLine/>
                </Button>
        
        </Td>
    </Tr>
  )
}

export default Row