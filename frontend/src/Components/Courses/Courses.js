import {
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import Pagination from 'react-js-pagination';
import '../Home/Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToPlaylist, getAllCourses } from '../../Redux/Action/courseAction';
import toast from 'react-hot-toast';
import { LoadUser } from '../../Redux/Action/userAction';
const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const {
    loading,
    error,
    courses,
    message,
    filteredCoursesCount,
    CourseCount,
    resultperPage,
  } = useSelector(state => state.courses);
  const categories = [
    'Web Development',
    'Machine Learning',
    'Devops',
    'Data Structure & Algorithms',
    'Data Science',
    'Game Development',
    'App Development',
  ];

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  let count = CourseCount;
  if (keyword) {
    count = filteredCoursesCount;
  }

  const addtoPlaylist = async courseId => {
    await dispatch(addToPlaylist(courseId));
    dispatch(LoadUser());
  };

  useEffect(() => {
    dispatch(getAllCourses(category, keyword, currentPage));

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [category, keyword, dispatch, error, message, currentPage]);

  return (
    <Container minH={'95vh'} maxW="container.lg" paddingY={'8'}>
      <Heading children="All Courses" m={'8'} />

      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        focusBorderColor={'gray'}
        placeholder="Search a Course..."
        type={'text'}
      />
      <HStack
        overflow={'auto'}
        paddingY={'8'}
        css={{ '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {categories.map((item, index) => (
          <Button
            key={index}
            onDoubleClick={() => setCategory('')}
            onClick={() => setCategory(item)}
            minW={'60'}
          >
            <Text children={item} />
          </Button>
        ))}
      </HStack>
      <Stack
        direction={['column', 'row']}
        flexWrap="wrap"
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        {courses.length > 0 ? (
          courses.map(item => (
            <CourseCard
              key={item._id}
              title={item.title}
              id={item._id}
              description={item.description}
              views={item.views}
              creator={item.createdBy}
              imageSrc={item.poster.url}
              lectureCount={item.noOfVideos}
              addtoPlaylist={addtoPlaylist}
              loading={loading}
            />
          ))
        ) : (
          <Heading mt={10} children="Course Not Found" />
        )}
      </Stack>
      {resultperPage <= count && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultperPage}
            totalItemsCount={CourseCount}
            onChange={setCurrentPageNo}
            itemClass="page-item"
            linkClass="page-link"
            nextPageText={'>'}
            prevPageText={'<'}
            firstPageText={'First'}
            lastPageText={'Last'}
          />
        </div>
      )}
    </Container>
  );
};

export default Courses;
