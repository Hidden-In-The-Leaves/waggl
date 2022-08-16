import React from 'react';
import styled from 'styled-components';
import { useSearchStore, usePackStore } from './../Store';

export default function SearchBar() {
  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
  const filterPack = usePackStore((state) => state.filter);

  const updateChange = (e) => {
    if (e.target.value.length > 2) {
      setSearchTerm(e.target.value);
      filterPack(e.target.value);
    } else {
      setSearchTerm('');
      filterPack('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <BarContainer>
        <SearchInput type="text" placeholder="Search for packs..." onChange={updateChange} />
        <SearchIcon src="https://img.icons8.com/ios-glyphs/30/9f9f9f/search--v1.png"/>
      </BarContainer>
    </form>
  );
}

const BarContainer = styled.div`
  width: 100%;
  position: relative;
`;

const SearchInput = styled.input`
  padding: 3%;
  border: 1px solid #9F9F9F;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  ::placeholder {
  color: #9A9A9A;
  font-size: 16px;
  }
`;

const SearchIcon = styled.img`
    position: absolute;
    right: 2%;
    padding: 2%;
    width: 25px;
    height: 25px;
`;