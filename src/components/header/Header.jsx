import React, { useEffect, useState } from 'react'
import "./header.scss"
import DropDownMenu from '../dropDownMenu/DropDownMenu';
import { Link } from 'react-router-dom';

export default function Header() {
    const [fullName, setFullName] = useState(null);
    useEffect(() => {
        setFullName(localStorage.getItem("fullName"));
    }, [])
  return (
    <>
      <nav className='container'>
        <Link to="/" className='logo'>
            KCKFORUM
        </Link>
        {fullName ? (<DropDownMenu username={fullName} />) 
        : <p><Link to="/login">Giriş Yap</Link>&nbsp;|&nbsp;<Link to="/register">Kayıt Ol</Link></p>}
    </nav>
    </>
      
    
  )
}
