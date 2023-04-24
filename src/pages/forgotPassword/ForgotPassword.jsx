import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./forgotPasword.scss"
import { toast } from 'react-toastify';
import { changePassword, forgotPassword } from '../../services/auth';

export default function ForgotPassword() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        passwordAgain: ""
    });
    const { email, password, passwordAgain } = formData;
    const search = useLocation().search;
    const token = new URLSearchParams(search).get("forgotPasswordToken");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
          ...formData,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (email !== "") {
          const data = {
            email: email,
          };
          forgotPassword(data).then((result) => {
            toast.success(result.message);
            navigate("/login");
          })
          .catch((error) => {
            toast.error(error.message);
          })
        } else {
          if(password === passwordAgain) {
            const data = {
            password: password,
            token: token
          }
          changePassword(data).then((result) => {
            toast.success(result.message);
            navigate("/login");
          })
          .catch((error) => {
            toast.error(error.message)
          });
        }else {
            toast.error("Passwords don't match")
          }
        }
      };
  return (
    <div className='forgotPassword-container'>
        <Link to='/login' className='forgotPasswordToLogin'>Giriş ekranına dön</Link>
        <h1 className='forgotPassword-logo'>KCKFORUM</h1>
        <form className='forgotPasswordForm' onSubmit={onSubmit}>
        {token ? (
            <>
                <input name='password' value={password} onChange={handleChange} placeholder='Yeni Şifre' type='password' required/>
                <input name='passwordAgain' value={passwordAgain} onChange={handleChange} placeholder='Yeni Şifreyi Onayla' required type='password'/>
                <button type='submit'>Şifreyi Değiştir</button>
            </>
        ):(
            <>
                <input name='email' value={email} onChange={handleChange} placeholder='Email' type='email' required/>
                <button type='submit'>Gönder</button>
                <span className="forgotPassword-info">
                    Şifrenizi yenilemek için bir mail alacaksınız.
                </span>
            </>
        )
        }
        </form>
    </div>
  )
}
