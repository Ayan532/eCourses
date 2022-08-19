import { Box, Grid, Heading, Stack, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Sidebar from '../layouts/Sidebar';
import cursor from '../../../Assets/img/cursor.png';
import DataBox from './DataBox';
import Bar from './Bar';
import { DoughnutChart, LineChart } from './Chart';
import toast from 'react-hot-toast';
import { useDispatch,  useSelector } from 'react-redux';
import { getDashboardStats } from '../../../Redux/Action/adminAction';
import Loader from '../../Layout/Loader/Loader';
const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    message,
    error,
    loading,
    stats,
    usersCount,
    subcriptionCount,
    viewsCount,
    subscriptionsPercentage,
    viewsPercentage,
    userPercentage,
    userProfit,
    viewsProfit,
    subscriptionProfit,
  } = useSelector(state => state.admin);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

    dispatch(getDashboardStats());
  }, [dispatch, error, message]);
  return (
    <Grid
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
      css={{ cursor: `url(${cursor}),default` }}
    >
      {loading || !stats? (
        <Loader />
      ) : (
        <Box boxSizing="border-box" py="16" px={['4', '0']}>
          <Text
            textAlign="center"
            opacity="0.5"
            children={`Last change was on ${String(new Date(stats[11].createdAt)).split('G')[0]}`}
          />
          <Heading
            children="Dashboard"
            ml={['0', '16']}
            mb="16"
            textAlign={['center', 'left']}
          />
          <Stack
            direction={['column', 'row']}
            minH="24"
            justifyContent={'space-evenly'}
          >
            <DataBox title="Views" qty={viewsCount} qtyPercentage={viewsPercentage} profit={viewsProfit} />
            <DataBox title="Users" qty={usersCount} qtyPercentage={userPercentage} profit={userProfit} />
            <DataBox
              title="Subcription"
              qty={subcriptionCount}
              qtyPercentage={subscriptionsPercentage}
              profit={subscriptionProfit}
            />
          </Stack>
          <Box
            m={['0', '16']}
            borderRadius={'lg'}
            p={['0', '16']}
            mt={['4', '16']}
            boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
          >
            <Heading
              textAlign={['center', 'left']}
              size="md"
              children="Views Graph"
              pt={['8', '0']}
              ml={['0', '16']}
            />
            <LineChart views={stats.map((item)=>item.views)}/>
          </Box>
          <Grid templateColumns={['1fr', '2fr 1fr']}>
            <Box p="4">
              <Heading
                textAlign={['center', 'left']}
                size="md"
                children="Progress Bar"
                my="8"
                ml={['0', '16']}
              />
              <Box>
                <Bar profit={viewsProfit} title="Views" value={viewsPercentage} />
                <Bar profit={userProfit} title="Users" value={userPercentage} />
                <Bar profit={subscriptionProfit} title="Subcription" value={subscriptionsPercentage} />
              </Box>
            </Box>
            <Box p={['0', '16']} boxSizing="border-box" py="4">
              <Heading textAlign={'center'} size="md" mb="4" children="Users" />
              <DoughnutChart users={[subcriptionCount,usersCount-subcriptionCount]} />
            </Box>
          </Grid>
        </Box>
      )}
      <Sidebar />
    </Grid>
  );
};

export default Dashboard;
