import styled from 'styled-components';

export const MainContainer = styled.div`
  width: 100%;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const SectionContainer = styled.div`
  margin: 5px 3%;
  border: 1px solid #d9d9d9;
  border-radius: 30px;
  height: 60vh;
  display: flex;
`;

export const ImageContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
`;

export const Icon = styled.i`
  margin: auto 10px;
  font-size: 50px;
  color: white;
  border-radius: 50%;
  background-color: lightgrey;
  opacity: 70%;
  &:hover {
    cursor: pointer;
    opacity: 100%;
  }
  position: absolute;
  top: 48%;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  position: abusolute;
  object-fit: cover;
  border-radius: 30px 0 0 30px;
`;

export const InfoContainer = styled.div`
  width: 50%;
  margin: auto 25px;
`;

export const Traits = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Trait = styled.div`
  border: 1px #e75707 solid;
  border-radius: 30px;
  padding: 0 5px;
  min-width: 50px;
  text-align: center;
`;

export const LikeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  gap: 10px;
`;

export const LikeIcon = styled.i`
  font-size: 50px;
  border-radius: 50%;
  border: 1px #ff8700 solid;
  width: 50px;
  height: 50px;
  text-align: center;
  color: #ff8700;
  &:hover {
    cursor: pointer;
  }
  margin-top: 30px;
`;

export const SuperLikeIcon = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

export const ModalContainer = styled.div`
  color: white;
  height: 400px;
  width: 400px;
  margin: auto;
  background-color: #ff8700;
`;

export const ModalImage = styled.img`
  object-fit: cover;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
`;

export const HeartIcon = styled.i`
  left: 43%;
  margin-top: 20%;
  position: absolute;
  font-size: 50px;
  color: white;
`;

export const Button = styled.button`
  position: absolute;
  left: 35%;
  margin-top: 25%;
  width: 30%;
  border-radius: 30px;
  font-size: 36px;
  color: #ff8700;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

export const H2 = styled.h2`
  position: absolute;
  width: 40%;
  left: 30%;
  margin-top: 45%;
  &:hover {
    cursor: pointer;
  }
`;
