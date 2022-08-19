import styled from 'styled-components';

export const PackContainer = styled.div`
  width: 35%;
  border-right: 2px lightgrey solid;
`;

export const PackMemberContainer = styled.div`
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const SubTitle = styled.div`
  font-size: 24px;
  font-weight: 900;
  margin: 20px 0;
  padding-left: 5%;
`;

export const Members = styled.div`
  display: flex;
  margin: 10px 10px 10px 5%;
  &:hover {
    cursor: pointer;
  }
`;

export const PacksList = styled.div`
  display: flex;
  margin: 10px 10px 10px 5%;
  &:hover {
    cursor: pointer;
  }
`;

export const CircleImage = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const MemberName = styled.p`
  margin: 10px 0 0 0;
`;

export const MemberLocation = styled.p`
  margin-top: 0;
`;
