import React from 'react'
import { Link } from 'react-router-dom'
import { FaUser, FaComment, FaClock } from 'react-icons/fa'
import './content.scss'

export default function Content({content}) {
  return (
    <Link to={`/content/?contentId=${content._id}`} className='content-container-link'>
        <div className='content-container'>
          <h2 className='title'>{content.title}</h2>
          <p className='description'>{content.description.length > 80 ? content.description.substring(0, 80) + "..." : content.description}</p>
          <div className='content-infos'>
            <Link to={`/user?id=${content.user.id}`} className='author'><FaUser /> {content.user.name}</Link>
            <p className='commentsNumber'><FaComment />{content.comments.length}</p>
            <p className='createdAt'> <FaClock />{new Date(content.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </Link>
  )
}
