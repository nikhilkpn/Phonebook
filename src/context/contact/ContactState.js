import React, {useReducer} from 'react'
import * as types from '../types'
import axios from 'axios'
import contactReducer from './contactReducer'
import ContactContext from './contactContext'


const ContactState = props =>{
    const initialState = {
        contacts:[
            {
                id:3,
                name:'nikhil',
                email: 'greg@fami.co',
                phone:'344353535',
                type:'professional'
            },
            {
                id:2,
                name:'Akhil',
                email: 'arjub@fami.co',
                phone:'344353535',
                type:'professional'
            }
        ],
        current:null,
        filtered:null,
        error:null
    }
    const [state,dispatch] = useReducer(contactReducer, initialState)

    const getContact = async ()=>{
        try {
            const res = await axios.get('/api/contacts')
            dispatch({type:types.GET_CONTACT, payload:res.data})
        } catch (error) {
            dispatch({type:types.CLEAR_CONTACT, payload: error.response.msg})
        }
    }
    const addContact = async contact=>{
        const config = {
            headers: {
                'Content-type':'application/json'
            }
        }
        try {
            const res = await axios.post('/api/contacts', contact,config)
            dispatch({type:types.ADD_CONTACT, payload:res.data})
        } catch (error) {
            
            dispatch({type:types.CONTACT_ERROR, payload: error.response.msg})
        }
    }
    const deleteContact = async id =>{
        try {
            const res = await axios.delete(`/api/contacts/${id}`)
            dispatch({type:types.DELETE_CONTACT, payload:res.data})
        } catch (error) {
            
            dispatch({type:types.CONTACT_ERROR, payload: error.response.msg})
        }
        dispatch({type:types.DELETE_CONTACT, payload:id})
    }
    const setCurrent = contact =>{
        dispatch({type:types.SET_CURRENT, payload:contact})
    }
    const clearContacts = () =>{
        dispatch({type:types.CLEAR_CONTACT})
    }
    const clearCurrent = () =>{
        dispatch({type:types.CLEAR_CURRENT})
    }
    const updateContact = async contact=>{
        const config = {
            headers: {
                'Content-type':'application/json'
            }
        }
        try {
            const res = await axios.put(`/api/contacts/${contact.id}`, contact,config)
            dispatch({type:types.UPDATE_CONTACT, payload:res.data})
        } catch (error) {
            dispatch({type:types.CONTACT_ERROR, payload: error.response.msg})
        }
    }
    const filterContacts = text =>{
        dispatch({type:types.FILTER_CONTACT, payload:text})
    }
    const clearFilter = () =>{
        dispatch({type:types.CLEAR_FILTER})
    }
        
    return <ContactContext.Provider
            value={{
                contacts:state.contacts,
                current:state.current,
                filtered :state.filtered,
                error :state.error,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter,
                getContact,
                clearContacts
            }}
        >
        {props.children}
        </ContactContext.Provider>
}

export default ContactState;