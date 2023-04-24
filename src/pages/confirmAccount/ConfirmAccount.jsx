import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { confirmAccount } from '../../services/auth';
import "./confirmAccount.scss"
import { toast } from 'react-toastify';

export default function ConfirmAccount() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [status, setStatus] = useState(200);
    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');

    useEffect(() => {
        confirmAccount(id).then((result) => {
            setIsSuccess(true);
            setIsLoading(false);
            toast.success(result.message);
        }).catch((error) => {
            setStatus(error.status);
            setIsSuccess(false);
            setIsLoading(false);
            toast.error(error.message);
        })
    }, [id])
  return (
    <div className='confirmAccount-container'
    style={
        isLoading ? {borderRadius: "100px 5px 100px 5px"} :
        status === 200
          ? { background: "green", borderRadius: "100px 5px 100px 5px" }
          : { background: "red", borderRadius: "5px 100px 5px 100px" }
      }>
        <h1 className='confirmAccount-message'>
            {isLoading ? 'Yükleniyor...' : isSuccess ? (
                <>
                    Giriş yapmak için lütfen&nbsp;
                    <Link to='/login' className='confirmAccountToLogin'>tıklayınız.
                    </Link>
                </>
            )
            : status === 500 ?
             "Sunucu hatası"
             : status===404 ?
              (
                <>
                    Kullanıcı bulunamadı lütfen tekrar kaydolmak için&nbsp;
                    <Link to='/register' className='confirmAccountToLogin'>tıklayınız.</Link>
                </>
            )
            :
            (
                <>
                    Hesabınız zaten aktif giriş yapmak için&nbsp;
                    <Link to='/login' className='confirmAccountToLogin'>tıklayınız.</Link>
                </>
            )
            }
            
        </h1>
    </div>
  )
}
