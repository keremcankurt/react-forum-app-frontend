import React, { useEffect, useState } from 'react';
import './home.scss';
import { toast } from 'react-toastify';
import { addContent, getContents } from '../../services/content';
import Content from '../../components/content/Content';
import Pagination from '../../components/pagination/Pagination';

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [contents, setContents] = useState(null);
  const [content, setContent] = useState({
    title: '',
    description: '',
  });
  const [selectedOption, setSelectedOption] = useState('En Yeni');
  const [isOpen, setIsOpen] = useState(false);
  const [showAddContent, setShowAddContent] = useState(false);
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const toggleAddContent = () => {
    setShowAddContent(!showAddContent);
  };

  useEffect(() => {
    getContents()
    .then((res) => {
        setContents(res);
    })
    .catch((err) => {
      toast.error(err.message);
    });
  },[]);
  const sortContents = (option) => {
    switch (option) {
      case 'En Yeni':
        return contents?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'En Eski':
        return contents?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'A-Z':
        return contents?.sort((a, b) => a.title?.localeCompare(b.title));
      case 'Z-A':
        return contents?.sort((a, b) => b.title?.localeCompare(a.title));
      case 'Yorum Sayısı':
        return contents?.sort((a, b) => b.comments.length - a.comments.length);
      default:
        return contents;
    }
  };
  
  const filteredContents = sortContents(selectedOption)?.filter(content => content.title?.toLowerCase().includes(searchText.toLowerCase()));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContents?.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleChange = (e) => {
    setSearchText(e.target.value);
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContent = content
    addContent(newContent)
    .then((res) => {
      toast.success(res.message);
      setSearchText('');
      setContent({
        text: '',
        description: ''
      });
      setContents([...contents, res.content]);
    })
    .catch((err) => {
      toast.error(err.message);
    });
  }

  const handleTextChange = (e) => {
    setContent({
    ...content,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <div className="home-container">
      <div className="searchbar">
        <div className='filterBar'>
        <button onClick={toggleAddContent} className={`addContent${showAddContent ? ' black' : ''}`}>Yeni Paylaşım Gir</button>
        <input type="text" placeholder="Ara" onChange={handleChange} />
        <div className="dropdown" onClick={handleToggle}>
          <button className="dropdown-button">{selectedOption}</button>
          {isOpen && (
            <div className="dropdown-content">
              <div
                className="dropdown-option"
                onClick={() => handleOptionSelect('En Yeni')}
              >
                En Yeni
              </div>
              <div
                className="dropdown-option"
                onClick={() => handleOptionSelect('En Eski')}
              >
                En Eski
              </div>
              <div
                className="dropdown-option"
                onClick={() => handleOptionSelect('A-Z')}
              >
                A-Z
              </div>
              <div
                className="dropdown-option"
                onClick={() => handleOptionSelect('Z-A')}
              >
                Z-A
              </div>
              <div
                className="dropdown-option"
                onClick={() => handleOptionSelect('Yorum Sayısı')}
              >
                Yorum Sayısı
              </div>
            </div>
          )}
        </div>
        </div>
        
      </div>
      {showAddContent && (
        <div className='add-content-container'>
          <form onSubmit={handleSubmit} className='add-content-form'>
            <input type="text" placeholder="Ne sormak istersin?"  name='title' onChange={handleTextChange} required/>
            <textarea type="text" placeholder="Açıklama girin..." name='description' onChange={handleTextChange} required/>
            <button type='submit'>Gönder</button>
            <button className="close-button" onClick={toggleAddContent}>
              &times;
            </button>
          </form>
        </div>
      )}
      
    </div>
      <div className='homepagecontents-container'>
      {filteredContents?.length  ? (
          <>
            {currentItems.map((content) => (
              <Content key={content._id} content={content} />
            ))}
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={filteredContents.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </>
        ):
        <h3>İlk paylaşımı sen yapmak ister misin?</h3>
        }
      </div>

    </>
  );
}
