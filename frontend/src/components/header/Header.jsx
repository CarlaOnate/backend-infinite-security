import React from "react";
import tecLogo from '../../images/logoInfiniteSecurity.png';
import { Navbar } from '../navbar/Navbar';
import { userOptions, adminOptions, notLoggedOptions } from './headerOptions';
import { NavLink } from 'react-router-dom';

const Header = (props) => {

  const { userLoggedIn, userIsAdmin } = props;
  const showUserOptions = userLoggedIn && !userIsAdmin;
  const showAdminOptions = userIsAdmin;

  const renderHeaderOptions = options => (
    <>{options.map(option => {
      return <NavLink key={option.to} to={option.to}><img className="header__logo" src = {tecLogo} alt="Tecnológic de Monterrey Logo"/></NavLink>})}
    </>
  );

  return (
    <header className="header">
      {showUserOptions && renderHeaderOptions(userOptions)}
      {showAdminOptions && renderHeaderOptions(adminOptions)}
      <Navbar {...props} />
    </header>
  );
};

export default Header;
