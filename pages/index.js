import WatchlistTable from "@/components/WatchlistTable";
import { useState } from "react";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('watchlist')) || [];
    }
    return [];
  });

  const handleUpdateWatchlist = (updatedWatchlist) => {
    setWatchlist(updatedWatchlist);
    if (typeof window !== 'undefined') {
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    }
  };

  return (
    <div>
      <h1>
          My Watchlist
      </h1>
      <WatchlistTable 
      watchlist={watchlist} 
      onUpdateWatchlist={handleUpdateWatchlist} 
      />
    </div>
  );
}
