/* eslint-disable camelcase */
import styled from 'styled-components';

export const Title = styled.div`
  font-size: 28px;
  font-weight: 900;
  margin: 20px;
`;

export const SubTitle = styled.div`
  font-size: 24px;
  font-weight: 900;
  margin: 20px;
`;

export const SectionTitle = styled.div`
  font-size: 20px;
  margin: 20px;
`;

export const Container = styled.div`
  padding: 0 1%;
  border-left: 0.5px solid #D9D9D9;
  border-right: 0.5px solid #D9D9D9;
  box-sizing: border-box;
  height: 92vh;
`;

export const Container_1_3 = styled(Container)`
  width: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container_2_3 = styled(Container)`
  width: 66%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container_1_4 = styled(Container)`
  width: 25%;
`;

export const Container_3_4 = styled(Container)`
  width: 75%;
`;

export const Container_1_2 = styled(Container)`
  width: 50%;
`;

export const Button = styled.button`
  color: white;
  background-color: #FF8700;
  border-radius: 30px;
  padding: 3px 10px;
  margin: 5px;
  border-radius: 30px;
  border-color: #FF8700;
  border-style: solid;
  &:hover {
    opacity: 60%;
    cursor: pointer;
  }
`;

export const InputLabel = styled.label`
  font-size: 16px;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  border: 1px solid #9F9F9F;
  border-radius: 10px;
  margin: 5px 0 15px 0;
  height: 40px;
  ::placeholder {
    color: #9A9A9A;
    font-size: 16px;
  }
`;

export const TextArea = styled.textarea`
  border: 1px solid #9F9F9F;
  border-radius: 10px;
  margin: 5px 0 15px 0;
  height: 40px;
  font-family: inherit;
  ::placeholder {
    color: #9A9A9A;
    font-size: 16px;
  }
`;
