import React from 'react';
import styled from 'styled-components';

function MemberRow({ member }) {
  return (
    <Row>
      <Img src={member.profile_pic_url} />
      <Col>
        <div style={{ fontWeight: '700' }}>{member.name}</div>
        <div>{`${member.city}, ${member.state}`}</div>
      </Col>
    </Row>
  );
}

export default MemberRow;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  align-items: center;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  object-fit: cover;
  margin-right: 10px;
`;