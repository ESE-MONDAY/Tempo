import React, { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQuery(query);

    try {
      const response = await axios.get('https://secure.geonames.org/searchJSON', {
        params: {
          q: query,
          maxRows: 10, 
          username: 'eselite', 
        },
      });
      
      const { geonames } = response.data;
      setSuggestions(geonames);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuggestions([])
    navigate(`/search/${query}`);
  };

  const handleClick = (value: string) => {
    setSuggestions([])
    navigate(`/search/${value}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center border border-purple-400 rounded-full px-4 ">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Lagos, NG"
          className="px-2 py-2 mr-2 flex-grow focus:outline-none bg-transparent"
        />
        <RiSearchLine className="text-gray-400" size={16} />
      </form>
      {query && suggestions.length > 0 && (
        <ul className='absolute bg-white mt-4 flex flex-col gap-2'>
          {suggestions.map((suggestion:any) => (
            <li className='border-b-[1px] border-b-red-400' key={suggestion.geonameId}>
               <button onClick={() => handleClick(suggestion.name)}>{suggestion.name}</button>
             </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
