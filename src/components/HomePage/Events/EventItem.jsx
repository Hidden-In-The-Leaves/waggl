import React from 'react';
import styled from 'styled-components';

const formatter = new Intl.DateTimeFormat('en', { month: 'short' });

// const months = {
//   1: 'Jan',
//   2: 'Feb',
//   3: 'Mar',
//   4: 'Apr',
//   5: 'May',
//   6: 'Jun',
//   7: 'Jul',
//   8: 'Aug',
//   9: 'Sep',
//   10: 'Oct',
//   11: 'Nov',
//   12: 'Dec',
// };

const DOW = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

export default function EventItem({ data }) {
  const start_date = new Date(data.start_time);
  const end_date = new Date(data.end_time);

  return (
    <CardContainer>
      <div>
        {start_date.getDate()}
        {formatter.format(start_date)}
      </div>
      <div>
        {data.name}
        {DOW[start_date.getDay()]}
        {start_date.toLocaleTimeString()}
        -
        {end_date.toLocaleTimeString()}
      </div>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  height: 100px;
  border: 1px solid #D9D9D9;
  border-radius: 10px;
`;
