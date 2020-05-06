import *as types from '../types'


export default (state,action) =>{
    switch(action.type){
        case types.GET_CONTACT:
            return {
                ...state,
                contacts: action.payload,
                loading:false
            }
            case types.ADD_CONTACT:
                return {
                    ...state,
                    contacts: [...state.contacts,action.payload],
                    loading:false
                }
                case types.DELETE_CONTACT:
                    return {
                        ...state,
                        contacts:state.contacts.filter(contact=> contact.id !== action.payload),
                        loading:false
            }
        case types.SET_CURRENT:
            return {
                ...state,
                current:action.payload
            }
        case types.CLEAR_CURRENT:
            return {...state,current:null}
        case types.CLEAR_CONTACT:
            return {
                ...state,
                current:null,
                filtered:null,
                contacts:null,
                error:null
            }
        case types.UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact.id===action.payload.id?
                action.payload:contact)
            }
        case types.FILTER_CONTACT:
            return {
                ...state,
                filtered: state.contacts.filter(contact=>{
                    const regex = new RegExp(`${action.payload}`,'gi')
                    return contact.name.match(regex) || contact.email.match(regex)
                })
            }
        case types.CLEAR_FILTER:
            return {
                ...state,
                filtered:null
            }
        case types.CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}