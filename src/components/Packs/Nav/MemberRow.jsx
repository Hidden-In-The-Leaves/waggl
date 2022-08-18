import React from 'react';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

function MemberRow({ member }) {
  return (
    <Row>
      <img src={member.userImageUrl} />
      <Col>
        <div>{member.userName}</div>
        <div>{member.userLocation}</div>
      </Col>
    </Row>
  );
}

export default MemberRow;
