import { useState, useEffect } from 'react';
import SearchForm from './SearchForm';

function WatchlistTable() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist'));
    console.log('Retrieved from local storage:', storedWatchlist);
    if (storedWatchlist) {
      setWatchlist(storedWatchlist);
    } else {
      setWatchlist([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const handleAdd = (newItem) => {
    setWatchlist([...watchlist, newItem]);
  };

  const handleEdit = (index, editedItem) => {
    const newWatchlist = [...watchlist];
    newWatchlist.splice(index, 1, editedItem);
    setWatchlist(newWatchlist);
  };

  const handleDelete = (index) => {
    const newWatchlist = [...watchlist];
    newWatchlist.splice(index, 1);
    setWatchlist(newWatchlist);
  };

  const handleSave = () => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    console.log('Watchlist saved:', JSON.parse(localStorage.getItem('watchlist')));
  };

  return (
    <div>
      <h1>My Watchlist</h1>
      <SearchForm handleAdd={handleAdd} />
      <table>
        <thead>
          <tr>
            <th>TV Show</th>
            <th>Season</th>
            <th>Episode</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.season}</td>
              <td>{item.episode}</td>
              <td>
                <button onClick={() => handleEdit(index, { ...item, name: prompt('Enter new name', item.name) })}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default WatchlistTable;