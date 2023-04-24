import React, { useState } from 'react'
import Content from '../../components/content/Content'
import { useEffect } from 'react'
import './contents.scss'
import { getContents } from '../../services/user';
import { toast } from 'react-toastify';

export default function Contents() {
  const [contents,setContents] = useState(null);
  useEffect(()=> {
    getContents()
    .then((contents) => {
      setContents(contents)
      })
    .catch((error) => {
      toast.error(error.message)
    });
  }, []);
  return (
    <div className='contents-container'>
    {contents?.length !== 0 ? 
    contents?.map((content) => <Content key={content._id} content={content} />)
    : <h2 > Paylaşımınız bulunmamaktadır.</h2>}
    </div>
  )
}
