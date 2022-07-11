import React, { useState } from 'react';
import './styles/search.scss';
import { useNavigate } from 'react-router-dom';
const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('search', keyword.trimEnd());
    navigate(`/search/${keyword}`);
  };
  return (
    <form action="#" className="search" onSubmit={handleSearch}>
      <input
        type="text"
        className="search__input"
        placeholder="Search product"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button className="search__button" type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
};

export default Search;
