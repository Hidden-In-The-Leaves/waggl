import styled from 'styled-components';

export const MatchContainer = styled.div`
  width: 35%;
  border-right: 2px lightgrey solid;
  height: 80vh;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const MatchListContainer = styled.div`
  display: flex;
  margin: 15px 15px 15px 5%;
`;

export const Match = styled.div`
  display: flex;
  width: 70%;
`;

export const Name = styled.div`
  width: 70%;
`;
export const DeleteIcon = styled.i`
  margin: auto;
  font-size: 20px;
  opacity: 70%;
  color: red;
  &:hover {
    cursor: pointer;
    opacity: 100%;
  }
`;
