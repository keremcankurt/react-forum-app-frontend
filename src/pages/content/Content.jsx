import React, { useEffect, useState } from 'react'
import { getContent } from '../../services/content';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaClock, FaComment, FaUser } from 'react-icons/fa';
import './content.scss'
import { addComment, getComments } from '../../services/comment';
import Comment from '../../components/comment/Comment';
import Pagination from '../../components/pagination/Pagination';

export default function Content() {
    const [content, setContent] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({
        text: ""
    });
    const [commentsLength, setCommentsLength] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [commentsPerPage] = useState(5);
    const {text} = comment
    const search = useLocation().search;
    const id = new URLSearchParams(search).get('contentId');

    useEffect(() => {
        getContent(id)
        .then(content => {
            setContent(content);
            getComments(id)
            .then(comments => {
                setComments(comments);
                setCommentsLength(comments.length);
            })
            .catch(err => {
                toast.error(err.message);
            })
        })
        .catch((error) => {
            toast.error(error.message)
        })
    }, [id])
    const handleChange = (e) => {
        setComment({
          ...comment,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(text.trim() === ""){
            toast.error("Please enter a comment");
        }else{
            const newComment = {
                text
            }
            addComment(newComment,id)
            .then((result) => {
                toast.success(result.message)
                setComment({
                    text: ""
                })
                setComments([...comments, result.comment]); 
                setCommentsLength(commentsLength+1);

            })
            .catch((error) => {
                toast.error(error.message)
            })
        }
    }
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='content-container'>
        {content && 
        <>
            <div className='content'>
                <h2 className='title'>{content.title}</h2>
                <p className='description'>{content.description}</p>
                <div className='content-infos'>
                    <Link to={`/user?id=${content.user.id}`} className='author'><FaUser /> {content.user.name}</Link>
                    <p className='commentsNumber'><FaComment />{commentsLength}</p>
                    <p className='createdAt'> <FaClock />{new Date(content.createdAt).toLocaleDateString()}</p>
                 </div>
            </div>
            <div className='comment-section'>
                <div className='comments'>
                    {currentComments && 
                    currentComments.map(comment => (
                        <Comment key={comment._id} comment={comment} />
                    ))}
                    <Pagination
                        itemsPerPage={commentsPerPage}
                        totalItems={comments.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <textarea
                        className='comment-input'
                        name='text'
                        placeholder='Yorum yaz...'
                        value={text}
                        onChange={handleChange}
                        style={{height: "150px", width: "100%"}}
                    />
                    <button type='submit'>Gönder</button>
                 </form>
            </div>
        </>
        }  
        </div>
    )
}
