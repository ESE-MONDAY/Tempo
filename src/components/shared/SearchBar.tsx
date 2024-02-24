import React, { useState } from 'react';
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
      <form onSubmit={handleSubmit} className="flex items-center  rounded-sm  w-full ">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Lagos, NG"
          className="px-2 py-2 flex-grow rounded-l-sm focus:outline-none bg-white"
        />
        <button type='submit' className='text-gray-100 bg-[#48484A] px-4 rounded-r-sm py-2'>Search</button>
      
      </form>
      {query && suggestions.length > 0 && (
        <ul className='absolute bg-white mt-4 flex flex-col gap-2  flex-grow '>
          {suggestions.map((suggestion:any) => (
            <li className='border-b-[1px]  text-gray-700 px-8 py-1' key={suggestion.geonameId}>
               <button onClick={() => handleClick(suggestion.name)}>{suggestion.name}</button>
             </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
