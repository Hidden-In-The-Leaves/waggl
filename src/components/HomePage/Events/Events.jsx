import React from 'react';
import { SubTitle, Container_1_4 } from '../../../styledComponents';
import { useEventsStore } from '../Store';
import EventItem from './EventItem';

export default function Events() {
  const events = useEventsStore((state) => state.events);

  return (
    <Container_1_4>
      <SubTitle>Events</SubTitle>
      {events.length === 0 && <div style={{ color: 'grey' }}>No Upcoming Events.</div>}
      {events.map((event) => <EventItem key={event.id} data={event} />)}
    </Container_1_4>
  );
}
