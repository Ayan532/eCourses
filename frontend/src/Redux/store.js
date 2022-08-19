import {configureStore} from '@reduxjs/toolkit'
import { adminReducer } from './Reducers/adminReducers'
import { courseReducer } from './Reducers/courseReducer'
import { subscriptionReducer } from './Reducers/subscriptionReducer'
import { profileReducer, userReducer } from './Reducers/userReducer'



const store=configureStore({
    reducer:{
        user:userReducer,
        profile:profileReducer,
        courses:courseReducer,
        subscription:subscriptionReducer,
        admin:adminReducer
    },
})


export const server='https://ecoursesapp.herokuapp.com/api/v1'


export default store