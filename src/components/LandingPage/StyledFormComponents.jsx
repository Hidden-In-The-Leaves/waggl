import styled from 'styled-components';

const Cols = styled.div`
  display: flex;
  flex-direction: row;
`;

const LinkButton = styled.button`
  background-color: transparent;
  border: none;
  color: #ff8700;
  font-size: 15px;
`;

const CenterText = styled.div`
  text-align: center;
  color: gray;
`;

const BigButton = styled.button`
  color: white;
  background-color: #ff8700;
  &:hover {
    opacity: 60%;
    cursor: pointer;
  }
  border: 1px solid #9f9f9f;
  border-radius: 10px;
  margin: 5px 0 15px 0;
  height: 40px;
  width: 100%;
`;

const GoogleButton = styled.button`
  text-align: center;
  color: black;
  background-color: transparent;
  &:hover {
    opacity: 60%;
    cursor: pointer;
  }
  border: 1px solid #9f9f9f;
  border-radius: 10px;
  margin: 5px 0 15px 0;
  height: 40px;
  width: 100%;
`;

const ContainerHalf = styled.div`
  padding: 3% 10%;
  border-left: 0.5px solid #d9d9d9;
  border-right: 0.5px solid #d9d9d9;
  box-sizing: border-box;
  height: 92vh;
  width: 50%;
`;

export { Cols, LinkButton, CenterText, BigButton, GoogleButton, ContainerHalf };
