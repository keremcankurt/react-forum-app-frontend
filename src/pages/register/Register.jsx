import React, { useState } from 'react'
import "./register.scss"
import { toast } from 'react-toastify';
import { register } from '../../services/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        place:"",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const navigate = useNavigate();
    const { name, surname, place, email, password, confirmPassword } = formData;
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (password!== confirmPassword) {
            toast.error("Passwords don't match")
        } else {
            const userData = {
                name,
                surname,
                place,
                email,
                password,
            };
            register(userData)
            .then((result) => {
                toast.success(result.message);
                navigate("/login",{replace: true});
            })
            .catch((error) => {
                toast.error(error.message);
            });


        }
    }
  return (
    <div className='register-container'>
        <div className='register'>
            <form onSubmit={handleSubmit} className='registerForm'>
                <h1 className='register-logo'>KCKFORUM</h1>
                <div className='fullName'>
                    <input name='name' value={name} placeholder='Ad' required onChange={handleChange}/>
                    <input name='surname' value={surname} placeholder='Soyad' required onChange={handleChange}/>
                </div>
                <input name='place' value={place} placeholder='Şehir' onChange={handleChange}/>
                <input name='email' value={email} placeholder='Email' type='email' required onChange={handleChange}/>
                <input name='password' value={password} placeholder='Şifre' type='password' required onChange={handleChange}/>
                <input name='confirmPassword' value={confirmPassword} placeholder='Şifreyi Onayla' type='password' required onChange={handleChange}/>
                <button type='submit'>Kayıt Ol</button>
                <Link to='/login' className='backToLogin'>Giriş Yap</Link>
            </form>
            
            
        </div>
    </div>
  )
}
