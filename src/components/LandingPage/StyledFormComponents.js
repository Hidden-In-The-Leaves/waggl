import styled from 'styled-components';

export const HalfImg = styled.img`
  object-fit:cover;
`;

export const Cols = styled.div`
  display: flex;
  flex-direction: row;
  position:relative;
`;

export const LinkButton = styled.button`
  background-color: transparent;
  border: none;
  color: #ff8700;
  font-size: 15px;
`;

export const CenterText = styled.div`
  text-align: center;
  color: gray;
`;

export const BigButton = styled.button`
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

// const GoogleButton = styled.button`
export const GoogleButton = styled.div`
  text-align: center;
  color: black;
  background-color: transparent;
  &:hover {
    opacity: 60%;
    cursor: pointer;
  }
  border: 1px solid #9f9f9f;
  border-radius: 10px;
  // margin: 5px 0 15px 0;
  height: 40px;
  width: 100%;
  position:relative;
`;

export const ContainerHalf = styled.div`
  padding: 3% 10%;
  border-left: 0.5px solid #d9d9d9;
  border-right: 0.5px solid #d9d9d9;
  box-sizing: border-box;
  height: 92vh;
  width: 50%;
`;

export const ContainerHalfForImage = styled.div`
  border-left: 0.5px solid #d9d9d9;
  border-right: 0.5px solid #d9d9d9;
  height: 92vh;
  width: 50%;
  display: flex;
  justify-content: center;
`;

export const CnneterImg = styled.img`
  top: 25%;
  left: 25%;
  position: absolute;
`;

export const CenterSpan = styled.span`
  top: 25%;
  left: 35%;
  position: absolute;
`;
