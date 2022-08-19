import { Button, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiAddCircleFill, RiDashboardFill, RiEyeFill, RiUser3Fill } from 'react-icons/ri'
import { FiSend } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
    const location=useLocation()
  return (
    <VStack spacing={"8"} p="16" boxShadow={"-2px 0 10px rgba(107,70,193,0.5)"}>
      <LinkButton url={"dashboard"} Icon={RiDashboardFill} title={"Dashboard"} active={location.pathname==='/admin/dashboard'}/>
      <LinkButton url={"courses"} Icon={RiEyeFill} title={"Courses"} active={location.pathname==='/admin/courses'}/>
      <LinkButton url={"createcourse"} Icon={RiAddCircleFill} title={"Create Courses"} active={location.pathname==='/admin/createcourse'}/>
      <LinkButton url={"users"} Icon={RiUser3Fill} title={"Users"} active={location.pathname==='/admin/users'}/>
      <LinkButton url={"request"} Icon={FiSend} title={"Request"} active={location.pathname==='/admin/request'}/>
      

    </VStack>
  )
}

function LinkButton({url,Icon,title,active}){
    return(
        <Link to={`/admin/${url}`}>
        <Button colorScheme={active ? "purple":" "} fontSize={"lg"} variant="ghost">
            <Icon/>
            {title}
        </Button>
    </Link>
    )
}
export default Sidebar