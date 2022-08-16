/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import isTomorrow from 'date-fns/isTomorrow';
import { SectionTitle } from '../../../styledComponents';

const formatter = new Intl.DateTimeFormat('en', { month: 'short' });

const DayOfWeek = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

export default function EventItem({ data }) {
  const startDate = new Date(data.start_time);
  const endDate = new Date(data.end_time);

  let startTime = startDate.toLocaleTimeString().split(' ');
  startTime = `${startTime[0].substring(0, startTime[0].length - 3)} ${startTime[1]}`;

  let endTime = endDate.toLocaleTimeString().split(' ');
  endTime = `${endTime[0].substring(0, endTime[0].length - 3)} ${endTime[1]}`;

  // add code below to link car to event detail
  /* <Link to={`/EventDetails/${data.id}`}> </Link>*/
  return (
    <CardContainer>
      <DateContainer>
        <StyledText fontSize="1.3rem" fontWeight="bold">
          {startDate.getDate()}
        </StyledText>
        <StyledText fontSize="1.1rem">
          {formatter.format(startDate)}
        </StyledText>
      </DateContainer>
      <DetailsContainer>
        <StyledText fontSize="16px" padding="1% 0" fontWeight="600">
          {data.event_name}
        </StyledText>
        <StyledText>
          {isTomorrow(startDate) ? (
            <>Tomorrow</>
          ) : (
            DayOfWeek[startDate.getDay()]
          )}
          {`, ${startTime} - ${endTime}`}
        </StyledText>
        <StyledText>
          {`${data.city}, ${data.state}`}
        </StyledText>
        <StyledText>
          <b>Hosted by:</b>
          {` ${data.pack_name}`}
        </StyledText>
      </DetailsContainer>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  height: 100px;
  border: 1px solid #D9D9D9;
  border-radius: 10px;
  /* padding: 4%; */
  margin: 5% 0;
  display: flex;
  align-items: center;
  font-size: 14px;
  &:hover {
    opacity: 60%;
    cursor: pointer;
  }
`;

const DateContainer = styled.div`
  width: 20%;
  text-align: center;
`;

const DetailsContainer = styled.div`
  width: 80%;
  padding: 1% 0;
`;

const StyledText = styled.div`
  font-size: ${props => props.fontSize ? props.fontSize : '14px'};
  font-weight: ${props => props.fontWeight ? props.fontWeight : '400'};
  padding: ${props => props.padding ? props.padding : '0.5% 0'};
`;

const DayStyle = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

const MonthStyle = styled.div`
  font-size: 24px;
`;