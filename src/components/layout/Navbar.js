import React, {useContext,Fragment} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'

export const Navbar = ({title, icon}) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const {isAuthenticated, user,logout }= authContext
    const {clearContacts }= contactContext;

    const onLogout = ()=> {
        logout();
        clearContacts();
    }
    const authLinks = (
        <Fragment>
            <li>{user && user.name}</li>
            <li>
                <a href="#!" onClick={onLogout}>
                    <i className="fas fa-sign-out-alt"></i><span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    )
    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register' >Register</Link>
            </li>
            <li>
                <Link to='/login' >Login</Link>
            </li>
        </Fragment>
    )
    return (
        <div className='navbar bg-primary'>
            <h1>
                <i className={icon}>{title}</i>
            </h1>
            <ul>
                {isAuthenticated?authLinks:guestLinks}
                {/* <li>
                    <Link to='/' >Home</Link>
                </li>
                <li>
                    <Link to='/about' >About</Link>
                </li> */}
               
            </ul>
        </div>
    )
}

Navbar.defaultProps = {
    title:'phone book',
    icon:'fas fa-id-card-alt'
}