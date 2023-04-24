import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserProfile } from '../../services/user';
import { getUserContents } from '../../services/content';
import { toast } from 'react-toastify';
import Content from '../../components/content/Content';
import Pagination from '../../components/pagination/Pagination';
import './user.scss';

export default function User() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    place: '',
    contents: [],
  });

  const { name, surname, place, contents } = formData;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');

  useEffect(() => {
    getUserProfile(id)
      .then((user) => {
        setFormData({
          name: user.name,
          surname: user.surname,
          place: user.place,
          contents: [],
        });
        getUserContents(id)
          .then((userContents) => {
            setFormData((prevState) => ({
              ...prevState,
              contents: userContents,
            }));
          })
          .catch((err) => {
            toast.error(err.message);
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contents.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='userPageWrapper'>
      <div className='profile'>
        <h2 className='profile-title'>Profil Bilgileri</h2>
        <div className='fullName'>
          <input
            name='name'
            placeholder='Ad'
            type='text'
            value={name}
            onChange={handleChange}
            disabled
          />
          <input
            name='surname'
            placeholder='Soyad'
            type='text'
            value={surname}
            onChange={handleChange}
            disabled
          />
        </div>
        <input
          name='place'
          placeholder='Şehir'
          type='text'
          value={place === "" ? "Belirtilmedi":place}
          onChange={handleChange}
          disabled
        />
        <p className='contentCount'>Paylaşım Sayısı: {contents?.length}</p>
      </div>
      <div className='contents'>
        <h2 className='contents-title'>Paylaşımlar</h2>
        {currentItems?.length !== 0 ? (
          <>
            {currentItems.map((content) => (
              <Content key={content._id} content={content} />
            ))}
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={contents.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </>
        ) : (
          <h3>Kullanıcının paylaşımı bulunmamaktadır.</h3>
        )}
      </div>
    </div>
  );
}
