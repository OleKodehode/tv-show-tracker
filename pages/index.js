import WatchlistTable from '@/components/WatchlistTable';
import { useState } from 'react';

export default function Home() {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (show) => {
    const newWatchlist = [...watchlist, show];
    setWatchlist(newWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
  };

  return (
    <div>
      <WatchlistTable watchlist={watchlist} setWatchlist={setWatchlist} />
    </div>
  );
}