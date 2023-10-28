import React from 'react';
import logo from "../images/header-logo.svg";

const Header = () => {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип Место"/>
    </header>
  );
};

export default Header;
