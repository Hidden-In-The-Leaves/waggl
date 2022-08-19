import React from 'react';
import styled from 'styled-components';

export default function SmallCard(props) {
  return (
   <AddCard>
      {/* <svg width="130" height="130" viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg"> */}
      <AddIcon preserveAspectRatio="xMidYMin" onClick={(e) => {e.preventDefault(); props.handleOpen()}}>
        <line x1='0' y1='60' x2='120' y2='60' stroke='#FF8700' strokeWidth="9" />
        <line x1='60' y1='0' x2='60' y2='120' stroke='#FF8700' strokeWidth="9" />
      </AddIcon>
   </AddCard>
  );
}

// const AddCard = styled.div`
//   display: flex;
//   /* width: 24.64vw; */
//   width: 32%;
//   height: 556px;
//   /* left: 115px;
//   top: 222px; */
//   /* text-align: center; */
//   align-items: center;
//   justify-content: center;
//   background: #FFFFFF;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
//   border-radius: 20px;
// `;
const AddCard = styled.div`
  display: flex;
  width: 32%;
  height: 556px;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0,0,0,0.25);
  border-radius: 20px;
`;

const AddIcon = styled.svg`
  display: inline-block;
  margin-left: 120px;
  width: 130;
  height: 130;
  viewBox: 0 0 130 130;
  version: 1.1;
  xmlns: 'http://www.w3.org/2000/svg;'
`;
