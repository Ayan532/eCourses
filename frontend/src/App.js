import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AdminCourses from './Components/Admin/AdminCourses/AdminCourses';
import CreateCourse from './Components/Admin/CreateCourse/CreateCourse';
import Dashboard from './Components/Admin/Dasboard/Dashboard';
import Users from './Components/Admin/Users/Users';
import ForgetPassword from './Components/Auth/ForgetPassword';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import ResetPassword from './Components/Auth/ResetPassword';
import CoursePage from './Components/CoursePage/CoursePage';
import Courses from './Components/Courses/Courses';
import Home from './Components/Home/Home';
import Navbar from './Components/Layout/Navbar/Navbar';
import Request from './Components/Layout/Request/Request';
import NotFound from './Components/Payment/NotFound';
import PaymentFail from './Components/Payment/PaymentFail';
import PaymentSuccess from './Components/Payment/PaymentSuccess';
import Subscribe from './Components/Payment/Subscribe';
import ChangePassword from './Components/Profile/ChangePassword';
import Profile from './Components/Profile/Profile';
import UpdateProfile from './Components/Profile/UpdateProfile';
import toast,{Toaster} from 'react-hot-toast'
import { LoadUser } from './Redux/Action/userAction';
import ProtectedRoute from './Components/Routes/ProtectedRoute';
import Loader from './Components/Layout/Loader/Loader';
import AdminRequest from './Components/Admin/Request/Request';
import Footer from './Components/Layout/Footer/Footer';
function App() {
  // window.addEventListener('contextmenu',(e)=>{
  //   e.preventDefault();
  // })
  const {user,isAuthenticated,error,message,loading}=useSelector(state=>state.user)
   const dispatch=useDispatch()
  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch({type:"clearError"})
    }
    if(message){
      toast.success(message)
      dispatch({type:"clearMessage"})
    }
     
  }, [dispatch,error,message])

  useEffect(() => {
    dispatch(LoadUser())
  }, [dispatch])
  
  
  return (
  <div>
    <BrowserRouter> 
      {
        loading?(<Loader/>):(<>
        <Navbar isAuthenticated={isAuthenticated} user={user}/>
      <Routes>
        <Route path="/" element={ <Home/> }/>
        <Route path="/courses" element={<Courses/>}/>
        <Route path="/course/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}><CoursePage user={user}/></ProtectedRoute>}/>

        <Route path="/me" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Profile user={user}/></ProtectedRoute>}/>
        <Route path="/updateprofile" element={<ProtectedRoute isAuthenticated={isAuthenticated}><UpdateProfile user={user}/></ProtectedRoute>}/>
        <Route path="/changepassword" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ChangePassword/></ProtectedRoute>}/>
  

        <Route path="/request" element={<ProtectedRoute isAuthenticated={isAuthenticated} ><Request user={user}/></ProtectedRoute>}/>
        <Route path="/subscribe" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Subscribe user={user}/></ProtectedRoute>}/>
        <Route path="/paymentsuccess" element={<PaymentSuccess/>}/>
        <Route path="/paymentfail" element={<PaymentFail/>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/login" element={ <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/me"> <Login/></ProtectedRoute> }/>
        <Route path="/register" element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/me"><Register/></ProtectedRoute>}/>
        <Route path="/forgetpassword" element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/me"><ForgetPassword/></ProtectedRoute>}/>
        <Route path="/resetpassword/:token" element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/me"><ResetPassword/></ProtectedRoute>}/>


        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role==='admin'}><Dashboard/></ProtectedRoute>}/>
        <Route path="/admin/courses"element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role==='admin'}><AdminCourses/></ProtectedRoute>}/>
        <Route path="/admin/createcourse"element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role==='admin'}><CreateCourse/></ProtectedRoute>}/>
        <Route path="/admin/users" element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role==='admin'}><Users/></ProtectedRoute>}/>
        <Route path="/admin/request" element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role==='admin'}><AdminRequest/></ProtectedRoute>}/>
      </Routes>
      <Toaster/>

      </>
      )}
      <Footer/>
    </BrowserRouter>
  </div>
  );
}

export default App;
