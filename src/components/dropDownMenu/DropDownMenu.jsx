import React, { useState, useRef, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { logout } from '../../services/auth';
import { toast } from 'react-toastify';
import "./dropDownMenu.scss"


export default function DropDownMenu(props) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, []);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    logout()
    .then((result) => {
        toast.success(result.message);
        localStorage.clear();
        navigate("/login", {replace: true})
    })
    .catch((error) => {

        toast.error(error.message);
        navigate("/login", {replace: true})
    });
    
  };

  return (
    <div className="dropdown" ref={ref}>
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {props.username}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <Link to="/profile" className="dropdown-item">Profil</Link>
          <button className="dropdown-item" onClick={handleLogout}>
            Çıkış
          </button>
        </div>
      )}
    </div>
  );
}
