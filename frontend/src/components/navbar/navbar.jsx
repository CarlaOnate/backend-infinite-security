import React from 'react';
import { userOptions, adminOptions, notLoggedOptions } from './navbarOptions';
import { NavLink, useLocation } from 'react-router-dom';
import '../../styles/navbar.css';
export const Navbar = (props) => {
  const { pathName } = useLocation();
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
      {userLoggedIn && <NavLink to="perfil" className='navbar__option'>PROFILE</NavLink>}
    </nav>
  );
};