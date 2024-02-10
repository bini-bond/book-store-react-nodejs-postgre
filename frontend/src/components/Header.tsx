import React from "react";

interface HeaderProps {
  title: string;
  logo?: string;
}

function Header(props: HeaderProps) {
  const { title, logo } = props;
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand mr-4" href="/">
          {title}
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/orders">
              Order List
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login" onClick={() => {localStorage.removeItem("token")}}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
