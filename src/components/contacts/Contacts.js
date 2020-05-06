import React, { Fragment , useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'
import { ContactItem } from './ContactItem';
import Spinner from '../layout/Spinner'


export const Contacts = () => {
    const contactContext = useContext(ContactContext)
    const {contacts, filtered, getContacts,loading} = contactContext
    
    useEffect(()=>{
        getContacts();
    },[])

    if (contacts.length === 0){
        return <h4>Please add contacts</h4>
    }
    return (
        <Fragment>
            {contacts !==null && !loading ? (
                filtered !== null
                ? filtered.map(contact => (
                    <ContactItem key={contact.id} 
                    contact={contact}/>
                )):
                contacts.map(contact=> <ContactItem key={contact.id} contact={contact}/>)
            ): <Spinner/>}
        </Fragment>
    )
}
