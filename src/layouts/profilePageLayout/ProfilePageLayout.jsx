import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './profilePageLayout.scss'
import { deleteAccount } from '../../services/user';
import { toast } from 'react-toastify';

export default function ProfilePageLayout() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const handleDeleteConfirmation = () => {
    deleteAccount()
    .then(result => {
        toast.success(result.message);
        navigate('/login', {replace: true});
  
  })
  .catch(error => {
        toast.error(error.message);
    });
}

  const location = useLocation();

  return (
    <>
      {showConfirmation && (
        <div className="confirmation-container">
          <div className="confirmation-box">
            <p>
              Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </p>
            <div className="confirmation-buttons">
              <button onClick={handleDeleteConfirmation}>Onayla</button>
              <button onClick={() => setShowConfirmation(false)}>İptal</button>
            </div>
          </div>
        </div>
      )}
      <div className="profile-page">
        <div className="left-bar">
          <nav>
            <ul>
              <li>
                <Link
                  to="/profile"
                  className={location.pathname === '/profile' ? 'active' : ""}
                >
                  Profil Bilgileri
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/shares"
                  className={location.pathname === '/profile/shares' ? 'active' : ""}
                >
                  Paylaşımlar
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/changepassword"
                  className={location.pathname === '/profile/changepassword' ? 'active' : ""}
                >
                  Şifre Değiştir
                </Link>
              </li>
              <li>
                <button
                  className="delete-account-button"
                  onClick={() => setShowConfirmation(true)}
                >
                  Hesabı Sil
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}
