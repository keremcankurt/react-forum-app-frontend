/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { editProfile, getProfile } from '../../services/user'
import { toast } from 'react-toastify'
import './profile.scss'
import { LoadingCircle } from '../../components/loadingCircle/loadingCircle'
export default function Profile() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        place: '',
        email: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { name, surname, place, email } = formData;

    
    useEffect(() => { 
        getProfile()
        .then(profile => {
            setFormData({
                name: profile.name,
                surname: profile.surname,
                place: profile.place,
                email: profile.email
            })
        })
        .catch(err => {
            toast.error(err.message)
            navigate("/",{replace: true})
        })
    }, [])
    
    const handleChange = (e) => {
        setFormData({
          ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        const data = {
            name,
            surname,
            place,
        }
        editProfile(data)
        .then(result => {
            setIsLoading(false)
            toast.success(result.message)
            localStorage.setItem('fullName', data.name+ " " + data.surname)
            window.location.reload();
        })
        .catch(err => {
            setIsLoading(false)
            toast.error(err.message)
        })
    }
    
  return (
        <div className='profile-container'>
            <h2 className='profiletext'>Profil Bilgileri</h2>
            <form onSubmit={handleSubmit} className='inputs'>
                <div className='fullName'>
                    <input name='name' placeholder='Ad' type='text' value={name} onChange={handleChange}/>
                    <input name='surname' placeholder='Soyad' type='text' value={surname} onChange={handleChange}/>
                </div>
                <input name='place' placeholder='Şehir' type='text' value={place === "" ? "Belirtilmedi": place} onChange={handleChange}/>
                <input name='email' placeholder='Email' type='email' value={email} disabled/>
                {isLoading ? 
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LoadingCircle />
                    </div> 
                    : <button type='submit'>Güncelle</button>}
            </form>
        </div>
  )
}
