import React, { useState } from 'react';
import './styles/search.scss';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@material-ui/icons';
const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trimEnd()) {
      navigate(`/search/${keyword}`);
    }
  };
  return (
    <form className="search" onSubmit={handleSearch}>
      <input
        type="text"
        className="search__input"
        placeholder="Search product"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button className="search__button" type="submit">
        {/* <i className="fa-solid fa-magnifying-glass"></i> */}
        <SearchOutlined style={{ color: 'orange' }} />
      </button>
    </form>
  );
};

export default Search;
