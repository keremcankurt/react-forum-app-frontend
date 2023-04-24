import React, { useState } from 'react'
import { changePassword } from '../../services/user'
import { toast } from 'react-toastify'

export default function ChangePassword() {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const { oldPassword, newPassword, confirmPassword } = formData
    const handleChange = (e) => {
        setFormData({
          ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (newPassword!== confirmPassword) {
            toast.error('Passwords do not match')
        } else {
        const data = {
            oldPassword,
            newPassword
        }
        changePassword(data)
        .then((result) => {
            toast.success(result.message)
        })
        .catch((err) => {
            toast.error(err.message)
        })
    }
}
  return (
    <div className='profile-container'>
        <h2 className='profiletext'>Şifre Değiştir</h2>
        <form onSubmit={handleSubmit}  className='inputs'>
            <input name='oldPassword' placeholder='Eski Şifre' value={oldPassword} type='password' onChange={handleChange}/>
            <input name='newPassword' placeholder='Yeni Şifre' value={newPassword} type='password' onChange={handleChange}/>
            <input name='confirmPassword' placeholder='Şifreyi Onayla' value={confirmPassword} type='password' onChange={handleChange}/>
            <button type='submit'>Güncelle</button>
        </form>
    </div>
  )
}
