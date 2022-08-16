import styled from 'styled-components';

export const Title = styled.div`
  font-size: 28px;
  font-weight: 900;
  margin: 20px 0;
`;

export const SubTitle = styled.div`
  font-size: 24px;
  font-weight: 900;
  margin: 20px 0;
`;

export const SectionTitle = styled.div`
  font-size: 20px;
  margin: 3% 0;
`;

export const Container = styled.div`
  padding: 0 3%;
  border-left: 0.5px solid #D9D9D9;
  border-right: 0.5px solid #D9D9D9;
  box-sizing: border-box;
`;

export const Container_1_3 = styled(Container)`
  width: 30%;
`;

export const Container_2_3 = styled(Container)`
  width: 70%;
`;


export const Button = styled.button`
  color: white;
  background-color: #FF8700;
  border-radius: 30px;
  padding: 3px 10px;
  border-radius: 30px;
  border-color: #FF8700;
  border-style: solid;
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