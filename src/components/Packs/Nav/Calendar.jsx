import styled from 'styled-components';
import React from 'react';

function Calendar({ calendarId }) {
  return (
    <iframe
      src="https://calendar.google.com/calendar/embed?src=kpljvvfi7tlljvrjg334lcgvio@group.calendar.google.com"
      width="100%"
      height="300"
      frameBorder="0"
      scrolling="no"
    />
  );
}

export default Calendar;
