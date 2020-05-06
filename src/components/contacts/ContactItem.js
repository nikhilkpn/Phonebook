import React,{ useContext} from 'react'
import ContactContext from '../../context/contact/contactContext'


export const ContactItem = ({ contact }) => {
    const contactContext = useContext(ContactContext);
    const {deleteContact, setCurrent,clearCurrent } = contactContext;
    const {id,email,name,phone,type} = contact
    
    const onDelete = ()=>{
        deleteContact(id);
        clearCurrent()
    }
    return (
        <div className='card bg-light'>
            <h3 className="text-primary text-left">
                {name}{' '} 
                <span style={{float:'right'}}
                    className={'badge'+(type==='professional'? 'badge-success':'badge-primary')}>
                {type.charAt(0).toUpperCase()+ type.slice(1)}</span>
            </h3> 
            <ul className="list">
                {email && (
                    <li>
                        <i className="fas fa-envolope-open"/>{email}
                    </li> 
                )}
                {phone && (
                    <li>
                        <i className="fas fa-envolope-open"/>{phone}
                    </li>
                )}
            </ul>
            <p>
                <button className='btn btn-dark btn-sm' onClick={()=>setCurrent(contact)}>Edit</button>
                <button className='btn btn-danger btn-sm' onClick={onDelete}>Delete</button>
            </p>
        </div>
    )
}
