import { useState } from 'react';

export default function SearchForm(props) {
  const { handleAdd } = props;
  const [name, setName] = useState('');
  const [season, setSeason] = useState('');
  const [episode, setEpisode] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleNameChange = (event) => {
    const query = event.target.value;
    setName(query);
    if (query) {
      fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
        .then(res => res.json())
        .then(data => {
          setSuggestions(data.map((item) => item.show.name));
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && season && episode) {
      handleAdd({ name, season, episode });
      setName('');
      setSeason('');
      setEpisode('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <label>
        TV Show:
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        {suggestions.length > 0 && (
          <ul>
            {suggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => setName(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </label>
      <br/>
      <label>
        Season:
        <input
          type="text"
          value={season}
          onChange={(event) => setSeason(event.target.value)}
          placeholder="Enter season number"
        />
      </label>
      <br/>
      <label>
        Episode:
        <input
          type="text"
          value={episode}
          onChange={(event) => setEpisode(event.target.value)}
          placeholder="Enter episode number"
        />
      </label>
      <br/>
      <button
        type="submit"
      >
        Add to Watchlist
      </button>
    </form>
  );
}
