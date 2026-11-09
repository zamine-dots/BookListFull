import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/auth-context';

function BookCard({ bok }) {
  const isSavedBook = Object.hasOwn(bok, 'bookTitle');
  const [heart, setHeart] = useState(isSavedBook);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const { addfavbook } = useAuth();

  const coverUrl = isSavedBook
    ? bok.coverUrl
    : bok.cover_i ? `https://covers.openlibrary.org/b/id/${bok.cover_i}-M.jpg` : '';
  const title = isSavedBook ? bok.bookTitle : bok.title;
  const author = isSavedBook ? bok.bookAuther : bok.author_name?.[0] || 'Unknown Author';

  async function toggleFavorite() {
    setSaving(true);
    setError('');
    try {
      const nextHeart = !heart;
      const saved = await addfavbook({ coverUrl, title, author }, nextHeart);
      if (saved === false) throw new Error('Could not save your change.');
      setHeart(nextHeart);
    } catch {
      setError('Could not update favorites. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card" style={{ width: '18rem' }}>
      {coverUrl && <img src={coverUrl} className="card-img-top" alt={title} />}
      <div className="card-body" style={{ backgroundColor: '#000000' }}>
        <p className="card-text" style={{ color: 'white' }}>{title}</p>
        <p className="card-text" style={{ color: 'gray' }}>{author}</p>
        <button
          type="button"
          className="btn btn-outline-light"
          onClick={toggleFavorite}
          disabled={saving}
          aria-label={heart ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={heart}
        >
          {heart ? '❤️' : '🤍'}
        </button>
        {error && <p role="alert" className="text-warning mt-2">{error}</p>}
      </div>
    </div>
  );
}

BookCard.propTypes = {
  bok: PropTypes.shape({
    cover_i: PropTypes.number,
    coverUrl: PropTypes.string,
    title: PropTypes.string,
    bookTitle: PropTypes.string,
    author_name: PropTypes.arrayOf(PropTypes.string),
    bookAuther: PropTypes.string,
  }).isRequired,
};

export default BookCard;
