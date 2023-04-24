import React, { useState } from 'react'
import "./login.scss"
import { login } from '../../services/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function Login() {

  
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const {email, password} = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const userData = {
          email,
          password,
        };
        login(userData).then((result) => {
          localStorage.setItem("fullName", result.fullName);
          navigate("/", {replace: true}
          )})
        .catch(err => {
          setIsLoading(false)
          toast.error(err.message)
        });

    };

  return (
    <div id='login-container'>
      <div className='login'>
        <form onSubmit={onSubmit} className='loginForm'>
          <h1 className='login-logo'>KCKFORUM</h1>
            <input name='email' placeholder='Email' type='email' value={email} onChange={onChange} required/>
            <input name='password' placeholder='Password' type='password' value={password} onChange={onChange} required/>
            <Link to='/forgotpassword' className='forgotPassword'>Şifremi Unuttum</Link>
            {isLoading ? (
              <button disabled className='loading'>Giriş Yapılıyor...</button>
            ):(
              <button type='submit'>Giriş Yap</button>
            )}
            
            <Link to='/register' className='goToRegister'>Kayıt Ol</Link>
        </form>
      </div>
    </div>
  )
}
