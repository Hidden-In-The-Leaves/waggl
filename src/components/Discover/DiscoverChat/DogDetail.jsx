import React, { useState } from 'react';
import {
  MainContainer,
  SectionContainer,
  ImageContainer,
  Icon,
  Image,
  InfoContainer,
  Traits,
  Trait,
  LikeContainer,
  LikeIcon,
  SuperLikeIcon,
} from './MainSection.styled';

export default function DogDetail({ dog }) {
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <SectionContainer>
      <ImageContainer>
        <Icon
          className="fa-solid fa-circle-chevron-left"
          onClick={() => setImageIndex(imageIndex - 1 < 0 ? 0 : imageIndex - 1)}
          title={imageIndex === 0 ? 'This is the first picture' : ''}
        ></Icon>
        <Image src={dog.images[imageIndex]} alt={dog.name} />
        <Icon
          className="fa-solid fa-circle-chevron-right"
          style={{ right: 0 }}
          onClick={() =>
            setImageIndex(
              imageIndex + 1 === dog.images.length ? imageIndex : imageIndex + 1
            )
          }
          title={
            imageIndex === dog.images.length - 1
              ? 'This is the last picture'
              : ''
          }
        ></Icon>
      </ImageContainer>
      <InfoContainer>
        <h1>
          {dog.name}, {dog.age}
        </h1>
        <i className="fa-solid fa-location-dot"></i>
        {'  '}
        <span>
          {dog.city}, {dog.state}
        </span>
        {dog.likes && <p>"{dog.likes}"</p>}
        {dog.traits.length !== 0 && (
          <div>
            <p style={{ marginBottom: '5px' }}>Traits</p>
            <Traits>
              {dog.traits.map((trait, i) => (
                <Trait key={i}>{trait}</Trait>
              ))}
            </Traits>
            <p>Activity</p>
          </div>
        )}
      </InfoContainer>
    </SectionContainer>
  );
}
