import './App.css';
import { useState } from 'react';
import booksData from './data/books';

function App() {
  const [index, setIndex] = useState(0);
  const [saved, setSaved] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
  const [anim, setAnim] = useState('');
  const [route, setRoute] = useState('home');

  const total = booksData.length;
  const current = booksData[index] || null;

  const nextBook = () => {
    setIndex((i) => (i + 1) % total);
  };

  const handleConfirm = () => {
    if (!current) return;
    // Prevent saving if already in saved or readBooks
    const alreadySaved = saved.find((b) => b.id === current.id);
    const alreadyRead = readBooks.find((b) => b.id === current.id);
    if (alreadySaved || alreadyRead) {
      setAnim('rotate-left');
      setTimeout(() => setAnim(''), 500);
      nextBook();
      return;
    }
    setSaved((prev) => [...prev, current]);
    setAnim('rotate-left');
    setTimeout(() => setAnim(''), 500);
    nextBook();
  };

  const handleReject = () => {
    setAnim('rotate-right');
    setTimeout(() => setAnim(''), 500);
    nextBook();
  };

  const markAsRead = (bookId) => {
    const book = saved.find((b) => b.id === bookId);
    if (book) {
      setSaved((prev) => prev.filter((b) => b.id !== bookId));
      setReadBooks((prev) => [...prev, book]);
    }
  };

  const markAsUnread = (bookId) => {
    const book = readBooks.find((b) => b.id === bookId);
    if (book) {
      setReadBooks((prev) => prev.filter((b) => b.id !== bookId));
      setSaved((prev) => [...prev, book]);
    }
  };

  return (
    <>
      <header className="simple-header">
        <div className="left-icons">
          <button
            className="text-btn"
            aria-label="Open blank page"
            title="Open"
            onClick={() => setRoute('blank')}
          >
            Lists
          </button>
          <button
            className="text-btn"
            aria-label="Discover (go home)"
            title="Discover"
            onClick={() => setRoute('home')}
          >
            Discover
          </button>
        </div>
        <div className="header-title">
          <h1 className="simple-title">ReadIn</h1>
        </div>
      </header>

      {route === 'home' ? (
        <main className="app-container">
          <div className={`portrait-box ${anim}`}>
            {current ? (
              <>
                <img className="cover-image" src={current.coverUrl} alt={current.title} />
                <div className="book-info">
                  <h2 className="book-title">{current.title}</h2>
                  <p className="book-desc">{current.description}</p>
                </div>
              </>
            ) : (
              <div className="no-book">No book available</div>
            )}
          </div>

          <div className="controls">
            <button className="btn btn-check" aria-label="Confirm" onClick={handleConfirm}>✓</button>
            <button className="btn btn-x" aria-label="Reject" onClick={handleReject}>✕</button>
          </div>

          <div className="saved-count">Saved: {saved.length}</div>
        </main>
      ) : (
        <main className="app-container lists-page">
          <div className="reading-list-section">
            <h2 className="section-title">Reading List</h2>
            <div className="books-container">
              <button 
                className="scroll-btn scroll-left" 
                onClick={() => {
                  const container = document.querySelector('.saved-books-list');
                  container.scrollBy({ left: -200, behavior: 'smooth' });
                }}
                aria-label="Scroll left"
              >
                ‹
              </button>
              
              <div className="saved-books-list horizontal-scroll">
                {saved.length === 0 ? (
                  <p className="no-saved-books">No books saved yet. Click ✓ to add books to your list.</p>
                ) : (
                  saved.map(book => (
                    <div key={book.id} className="saved-book-card">
                      <img 
                        src={book.coverUrl} 
                        alt={book.title} 
                        className="saved-book-cover"
                      />
                      <div className="saved-book-info">
                        <h3 className="saved-book-title">{book.title}</h3>
                        <p className="saved-book-author">{book.author}</p>
                      </div>
                      <button 
                        className="read-btn"
                        onClick={() => markAsRead(book.id)}
                      >
                        Read
                      </button>
                    </div>
                  ))
                )}
              </div>

              <button 
                className="scroll-btn scroll-right" 
                onClick={() => {
                  const container = document.querySelector('.saved-books-list');
                  container.scrollBy({ left: 200, behavior: 'smooth' });
                }}
                aria-label="Scroll right"
              >
                ›
              </button>
            </div>
          </div>

          <div className="reading-list-section">
            <h2 className="section-title">Read Books</h2>
            <div className="books-container">
              <button 
                className="scroll-btn scroll-left" 
                onClick={() => {
                  const container = document.querySelector('.saved-books-list.horizontal-scroll');
                  container.scrollBy({ left: -200, behavior: 'smooth' });
                }}
                aria-label="Scroll left"
              >
                ‹
              </button>

              <div className="saved-books-list horizontal-scroll">
                {readBooks.length === 0 ? (
                  <p className="no-saved-books">No books marked as read yet.</p>
                ) : (
                  readBooks.map(book => (
                    <div key={book.id} className="saved-book-card">
                      <img 
                        src={book.coverUrl} 
                        alt={book.title} 
                        className="saved-book-cover"
                      />
                      <div className="saved-book-info">
                        <h3 className="saved-book-title">{book.title}</h3>
                        <p className="saved-book-author">{book.author}</p>
                      </div>
                      <button 
                        className="read-btn"
                        onClick={() => markAsUnread(book.id)}
                      >
                        Unread
                      </button>
                    </div>
                  ))
                )}
              </div>

              <button 
                className="scroll-btn scroll-right" 
                onClick={() => {
                  const container = document.querySelector('.saved-books-list.horizontal-scroll');
                  container.scrollBy({ left: 200, behavior: 'smooth' });
                }}
                aria-label="Scroll right"
              >
                ›
              </button>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default App;
