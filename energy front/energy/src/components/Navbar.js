import React, { useEffect, useState } from 'react'
import { Button } from '../styles/buttons.sryle';
import { Nav, NavMenu, NavMenuLinks, MeniuBar, NavBtn } from '../styles/navBar.style';


export const menuData = [
]

export const menuDataAdmin = [
    {title: 'Asign', link: '/admin'},
    {title: 'Users', link: '/editUsers'},
    {title: 'Device', link: '/edtDev'},
    {title: 'Chat', link: '/chat'}
]

const Navbar = () => {

  const [rol, setRol] = useState([]);

  useEffect(() => {
  const rol = JSON.parse(localStorage.getItem('rol'));
    setRol(rol);
  }, [rol]);

  const handleLogOut = () => {
    localStorage.setItem("user", JSON.stringify(""));
    localStorage.setItem("rol", JSON.stringify(""));
  }

  return (
    (rol === "ADMIN") ? (
      <Nav>
        <MeniuBar />
        <NavMenu>
          {menuDataAdmin.map((item, index) => (
            <NavMenuLinks to={item.link} key={index}>
              {item.title}
            </NavMenuLinks>
          ))}
        </NavMenu>
        <NavBtn>
          <Button to='/login' primary='false' onClick={handleLogOut} >Log Out</Button>
        </NavBtn>
      </Nav>)
      : (
        <Nav>
        <MeniuBar />
        <NavMenu>
          {menuData.map((item, index) => (
            <NavMenuLinks to={item.link} key={index}>
              {item.title}
            </NavMenuLinks>
          ))}
        </NavMenu>
        <NavBtn>
          <Button to='/login' primary='false' onClick={handleLogOut} >Log Out</Button>
        </NavBtn>
      </Nav>
      )
  )
}

export default Navbar