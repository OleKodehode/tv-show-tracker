import WatchlistTable from "@/components/WatchlistTable";

export default function Watchlist() {
  const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

  return (
    <div>
      <h1>My Watchlist</h1>
      <WatchlistTable watchlist={watchlist} />
    </div>
  );
}