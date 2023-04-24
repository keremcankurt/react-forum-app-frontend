import React from 'react'
import { FaClock, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Comment({comment}) {
  return (
    <div className='comment'>
        <p>{comment.text}</p>
        <div className='comment-infos'>
            <Link to={`/user?id=${comment.user.id}`} className='author'><FaUser /> {comment.user.name}</Link>
            <p className='createdAt'> <FaClock />{new Date(comment.createdAt).toLocaleDateString()}</p>
        </div>
    </div>
  )
}
