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
`;