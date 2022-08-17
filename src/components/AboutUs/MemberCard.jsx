import React from 'react';
import styled from 'styled-components';

export default function MemberCard({ member }) {
  const { name, role, catchPhrase, photo_url, linked_in } = member;

  return (
    <Card>
      <a href={linked_in} target="_blank">
        <ProfilePic
          src={photo_url || "https://images.unsplash.com/photo-1558788353-f76d92427f16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=738&q=80"}
        />
      </a>
      <Info>
        <Title>{name}</Title>
        <div style={{ textAlign: 'center' }}><em>{role}</em></div>
        <p style={{ textAlign: 'center', overflowWrap: 'break-word' }}>{`"${catchPhrase}"`}</p>
      </Info>
    </Card>
  );
}

const Card = styled.div`
  width: 40%;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  /* overflow: hidden; */
`;

const ProfilePic = styled.img`
  width: 15vmin;
  height: 15vmin;
  border-radius: 20px;
  object-fit: cover;
  transition: transform 250ms;
  &:hover {
    transform: translateY(-10px);
  }
`;

const Info = styled.div`
  width: 200px;
  text-align: center;
  font-size: 90%
`;

const Title = styled.div`
  font-size: 100%;
  font-weight: 900;
  padding: 3px 0;
  text-align: center;
`;
