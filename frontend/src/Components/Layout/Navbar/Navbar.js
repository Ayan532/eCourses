import { Avatar, Button, Heading, HStack, MenuButton, MenuItem, MenuList,Menu, MenuDivider, Flex, Box, useColorModeValue, useDisclosure, DrawerOverlay, DrawerContent, DrawerHeader, Drawer, DrawerBody, VStack,  } from '@chakra-ui/react'
import React from 'react'
import {ColorModeSwitcher} from '../../../ColorModeSwitcher'
import {GiGraduateCap} from 'react-icons/gi'
import {RiMenuFill} from 'react-icons/ri'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LogoutUser } from '../../../Redux/Action/userAction'

const LinkBtn=({url="/",title="Home",onClose})=>(
  <Link  onClick={onClose} to={url}>
    <Button variant={'ghost'}>{title}</Button>
  </Link>

)


const Navbar = ({user,isAuthenticated=false}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch =useDispatch()
  const handleLogout=()=>{
    dispatch(LogoutUser())
    onClose()
  }
  return (
  <>
    
        <Flex h={16} px={"5"}  alignItems={'center'} bg={useColorModeValue('White', 'gray.900')}  position="fixed" zIndex={'overlay'} w="100%" justifyContent={'space-between'}>
          <Button
            size={'md'}
            colorScheme={'gray'}
            width="12"
            height={"12"}
            rounded={"full"}
            justifyContent={'center'}
            aria-label={'Open Menu'}
            // display={{ md: 'none' }}
            alignItems={'center'}
            onClick={onOpen}
          >
           <RiMenuFill/> 
          </Button>
          <HStack spacing={8} alignItems={'center'}>
            <Box>
            
            <Heading direction="row">
            <Link to="/">
            <Flex justifyContent="center" alignItems={'center'}>
            <GiGraduateCap/>
            eCourses
            </Flex>
            </Link>
            </Heading>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {isAuthenticated?(<Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={user && user.avatar.url}
                />
              </MenuButton>
              <MenuList>
                <MenuItem><LinkBtn onClose={onClose} url='/me' title='Profile'/></MenuItem>
                {user && user.role==='admin'?(<MenuItem><LinkBtn onClose={onClose}url='/admin/dashboard' title='Dashboard'/></MenuItem>):(<MenuItem>Delete Profile</MenuItem>)}
                <MenuDivider />
                <MenuItem onClick={handleLogout}><Button variant={'ghost'}>Sign Out</Button></MenuItem>
              </MenuList>
            </Menu>):(<Link to="/login"><Button>Sign In</Button> </Link>)}
          </Flex>
        <Drawer placement='left'   onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay backdropFilter={'blur(10px)'}/>
          <DrawerContent>
          <DrawerHeader borderBottomWidth={"2px"}>
          <Heading> 
          <Flex justifyContent="center" alignItems={'center'}>
            <GiGraduateCap/>
            eCourses
            </Flex>
            </Heading>
            </DrawerHeader>
            <DrawerBody>
              <VStack>
                 <LinkBtn onClose={onClose} url='/' title='Home'/>
                 <LinkBtn onClose={onClose} url='/courses' title='Browse All Courses'/>
                 {user && user.subscription && user.subscription.status==='active'?(<LinkBtn onClose={onClose} url='/request' title='Request A Course'/>):(<></>)}
                 <LinkBtn onClose={onClose} url='/me' title='Profile'/>
                 <ColorModeSwitcher/>

              </VStack>

            </DrawerBody>
          </DrawerContent>
        </Drawer>



        </Flex>
     
  </>

  )
}

export default Navbar