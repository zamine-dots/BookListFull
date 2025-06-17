import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext';

function BookCard({ bok }) {
  const [heart, setHeart] = useState(false);
  const { addfavbook } = useAuth();

  // Detect if it's an OpenLibrary result or Appwrite favorite
  const isOpenLibrary = bok.hasOwnProperty("cover_i");

  // Use correct data based on source
  const coverUrl = isOpenLibrary
    ? `https://covers.openlibrary.org/b/id/${bok.cover_i}-M.jpg`
    : bok.coverUrl;

  const title = isOpenLibrary ? bok.title : bok.bookTitle;
  const author = isOpenLibrary
    ? (bok.author_name ? bok.author_name[0] : "Unknown Author")
    : bok.bookAuther;

  const bookInfo = {
    coverUrl,
    title,
    author_name: author,
  };

  useEffect(() => {
    // Avoid unnecessary API call on first render
    if (heart !== false) {
      addfavbook(bookInfo, heart);
    }
  }, [heart]);

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={coverUrl} className="card-img-top" alt={title} />
      <div className="card-body" style={{ backgroundColor: '#000000' }}>
        <p className="card-text" style={{ color: 'white' }}>{title}</p>
        <p className="card-text" style={{ color: 'gray' }}>{author}</p>
        <a onClick={() => setHeart(!heart)} style={{ cursor: "pointer" }}>
          {heart ? "❤️" : "🤍"}
        </a>
      </div>
    </div>
  );
}

export default BookCard;
