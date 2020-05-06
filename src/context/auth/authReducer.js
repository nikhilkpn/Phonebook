import *as types from '../types'


export default (state,action) =>{
    switch(action.type){
        case types.REGISTER_SUCCESS:
        case types.LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated:true,
                loading:false
            }
        case types.REGISTER_FAIL:
        case types.LOGIN_FAIL:
        case types.LOGOUT:
        case types.AUTH_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false,
                user:null,
                error: action.payload
            }
        case types.CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        case types.USER_LOADED:
            return {
                ...state,
                isAuthenticated:true,
                loading:false,
                user:action.payload
            }
        
        default:
            return state
    }
}