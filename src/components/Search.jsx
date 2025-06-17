import { useNavigate } from 'react-router-dom';
import "../styles/Search.css";
import axios from 'axios';
import { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { useAuth } from '../utils/AuthContext';

function Search({ placeholder = "Search for Book..." }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  async function handleSearch() {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError("");

    const url = `/api/search?q=${encodeURIComponent(searchTerm)}`;

    try {
      const response = await axios.get(url);
      setBooks(response.data.docs || []);
    } catch (error) {
      console.error("Search failed:", error);
      setError("Something went wrong while fetching books.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      navigate("/");
    }
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  function handleChangeSearchTerm() {
    setError("");
    setBooks([]);
  }

  return (
    <div className="Search-container">
      <input
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleChangeSearchTerm();
        }}
        value={searchTerm}
        autoFocus
        className="form-control mr-sm-2"
        placeholder={placeholder}
        aria-label="Search"
      />

      <div className="results books-grid">
        {loading && <p>Searching...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && error === "" && books.length === 0 && searchTerm && (
          <p>No books found for "{searchTerm}"</p>
        )}
        {books.length > 0 && books.map((book) => (
          <BookCard key={book.key || book.cover_i || book.title} bok={book} />
        ))}
      </div>
    </div>
  );
}

export default Search;
