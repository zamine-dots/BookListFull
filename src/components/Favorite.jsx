import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import "../styles/Search.css";
import BookCard from './BookCard';

function Favorite() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Set to true initially
  const { getFavBooks } = useAuth();

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const favBooks = await getFavBooks(); // Await in case it's async
        console.log(favBooks)
        setBooks(favBooks);
      } catch (err) {
        console.error("Failed to fetch favorite books:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, []);

  return (
    <div className="results books-grid">
      {loading && <p>Loading favorite books...</p>}
      {!loading && books.length === 0 && (
        <p>No favorite books found.</p>
      )}
      {books.length > 0 && books.map((book, index) => (
        <BookCard key={book.$id || index} bok={book} />
      ))}
    </div>
  );
}

export default Favorite;
