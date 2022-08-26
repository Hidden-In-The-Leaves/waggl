import React from 'react';
import styled from 'styled-components';
import MemberCard from './MemberCard';

export default function Team() {
  return (
    <Container>
      <Title>Our Engineering Team</Title>
      <FlexRow>
        {teamMembers.slice(0, 4).map((mem) => (
          <MemberCard key={mem.name} member={mem} />
        ))}
      </FlexRow>
      <FlexRow>
        {teamMembers.slice(4).map((mem) => (
          <MemberCard key={mem.name} member={mem} />
        ))}
      </FlexRow>
    </Container>
  );
}

const Container = styled.div`
  padding: 8vh 0;
  scroll-snap-align: start;
  width: 100vw;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: 900;
  padding: 2% 0;
  @media (max-width: 768px) {
    font-size: 24px;
    padding-top: 4vh;
  }
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding: 10px 0;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const teamMembers = [
  {
    name: 'Chris Lathen',
    role: 'Project Manager / Fullstack Developer',
    photo_url:
      'https://ca.slack-edge.com/T01J1BRG8E4-U03AZB6M29Y-60edf7297b54-512',
    linked_in: 'https://www.linkedin.com/in/christopherlathen/',
    catchPhrase:
      '',
  },
  {
    name: 'Juan Pinol',
    role: 'Architecture Owner / Fullstack Developer',
    photo_url: 'https://res.cloudinary.com/dl9zxpaoq/image/upload/v1661355800/1bfe955d-a0ba-4b56-b8ee-06660bc638ad_so6kze.jpg',
    linked_in: 'https://www.linkedin.com/in/juannnpinol/',
    catchPhrase:
      'Voted most likely to travel across the world to pet cute animals.',
  },
  {
    name: 'Chenyou Huang',
    role: 'Architecture Owner / Fullstack Developer',
    photo_url:
      'https://res.cloudinary.com/djgwnnspi/image/upload/v1660862234/Screen_Shot_2022-08-18_at_4.25.55_PM_mruci4.png',
    linked_in: 'https://www.linkedin.com/in/chenyou-huang/',
    catchPhrase: '',
  },
  {
    name: 'Elizabeth Bivens-Tatum',
    role: 'Architecture Owner / Fullstack Developer',
    photo_url: 'https://res.cloudinary.com/dl9zxpaoq/image/upload/v1661355799/2022-08-23_14.58.37_1_owns02.jpg',
    linked_in: 'https://www.linkedin.com/in/elizabeth-bivens-tatum/',
    catchPhrase: 'Dog lover and passionate web developer',
  },
  {
    name: 'Maria Hirai',
    role: 'UI Owner / Fullstack Developer',
    photo_url:
      'https://res.cloudinary.com/dl9zxpaoq/image/upload/v1660695544/Screen_Shot_2022-08-10_at_11.42.27_xiiuou.png',
    linked_in: 'https://www.linkedin.com/in/mariahirai/',
    catchPhrase: 'I love coding and talking to my dogs!',
  },
  {
    name: 'Jordan Addleman',
    role: 'UI Owner / Fullstack Developer',
    photo_url:
      'https://res.cloudinary.com/dl9zxpaoq/image/upload/v1661368420/Screen_Shot_2022-08-22_at_4.17.57_PM_audauo.png',
    linked_in: 'https://www.linkedin.com/in/jordan-addleman/',
    catchPhrase: 'Software Developer and Dog\'s Best Friend.',
  },
  {
    name: 'Xinyuan Zheng',
    role: 'UI Owner / Fullstack Developer',
    photo_url: 'https://res.cloudinary.com/dl9zxpaoq/image/upload/v1661368340/Image_from_iOS_1_pcensh.jpg',
    linked_in: 'https://www.linkedin.com/in/xinyuanzheng001/',
    catchPhrase: 'Corgi lover and developer that likes to create new stuff',
  },
];
