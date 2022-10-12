import React from 'react';
import { userOptions, adminOptions, notLoggedOptions } from './navbarOptions';
import { NavLink } from 'react-router-dom';
export const Navbar = (props) => {
  const { userLoggedIn, userIsAdmin } = props;
  const showUserOptions = userLoggedIn && !userIsAdmin;
  const showNotLoggedInOptions = !userLoggedIn;
  const showAdminOptions = userIsAdmin;

  const renderNavbarOptions = options => (
    <>{options.map(option => {
      return <NavLink key={option.to} className={({isActive}) => isActive ? option.selectedClassName : option.className} to={option.to}> {option.text} </NavLink>})}
    </>
  );

  return (
    <nav className='navbar'>
      {showNotLoggedInOptions && renderNavbarOptions(notLoggedOptions)}
      {showUserOptions && renderNavbarOptions(userOptions)}
      {showAdminOptions && renderNavbarOptions(adminOptions)}
      {userLoggedIn && <NavLink to="profile" className='navbar__option'>PROFILE</NavLink>}
    </nav>
  );
};