import React, { useReducer } from 'react'
import axios from 'axios'
import authReducer from './authReducer';
import AuthContext from './authContext';
import * as types from '../types'
import setAuthToken from '../../utils/setAuthToken';

const AuthState = props =>{
    const intilialState = {
        token:localStorage.getItem('token'),
        isAuthenticated:null,
        loading:true,
        user:null,
        error:null
    }
    const [state, dispatch] = useReducer(authReducer,intilialState)

    // Load User
    const loadUser = async ()=> {
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }
        try {
            const res = await axios.get('/api/auth')
            dispatch({type:types.USER_LOADED,payload:res.data})
        } catch (error) {
            dispatch({type:types.AUTH_ERROR})
            
        }
    }
    // Register User
    const register = async formData => {
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        }
        try {
            const res = await axios.post('/api/users',formData,config)
            dispatch({
                type: types.REGISTER_SUCCESS,
                payload:res.data // token
            })
            loadUser()
        } catch (error) {
            dispatch({
                type: types.REGISTER_FAIL,
                payload:error.response.data.msg
            })
            
        }
    }
     // Login User
    const login = async formData => {
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        }
        try {
            const res = await axios.post('/api/login',formData,config)
            dispatch({
                type: types.LOGIN_SUCCESS,
                payload:res.data // token
            })
            loadUser()
        } catch (error) {
            dispatch({
                type: types.LOGIN_FAIL,
                payload:error.response.data.msg
            })
            
        }
    }
   

    // Logout
    const logout = ()=> dispatch({type:types.LOGOUT})

    // Clear Errors
    const clearErrors = ()=> dispatch({type:types.CLEAR_ERRORS})

    return <AuthContext.Provider
            value={{
                token: state.token,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                error: state.error,
                register,
                loadUser,
                clearErrors,
                login,
                logout,
            }}
    >
        {props.children}
    </AuthContext.Provider>
}

export default AuthState;