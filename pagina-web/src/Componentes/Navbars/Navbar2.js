import React from 'react';
import { userOptions, adminOptions, notLoggedOptions } from './navbarOptions';
import { NavLink, useLocation } from 'react-router-dom';

export const Navbar2 = props => {
  const { pathname } = useLocation();
  const { userLoggedIn, userIsAdmin } = props;
  const showUserOptions = userLoggedIn && !userIsAdmin
  const showNotLoggedInOptions = !userLoggedIn
  const showAdminOptions = userIsAdmin

  const renderNavbarOptions = options => (<>
      {options.map(option => {
        const selected = pathname === option.to ? ("--selected") : ""
        return <NavLink key={option.to} className={`navbar__element${selected}`} to={option.to}> {option.text} </NavLink>
      })}
    </>)

  return (
    <nav className='navbar'>
      <div>Logo</div>
      <div>
        {showNotLoggedInOptions && renderNavbarOptions(notLoggedOptions)}
        {showUserOptions && renderNavbarOptions(userOptions)}
        {showAdminOptions && renderNavbarOptions(adminOptions)}
        {userLoggedIn && <NavLink className='navbar_element'>PROFILE</NavLink>}
      </div>
    </nav>
  )
}