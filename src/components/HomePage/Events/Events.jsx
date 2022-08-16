import React from 'react';
import { SubTitle } from '../../../styledComponents';
import { useEventsStore } from '../Store';
import EventItem from './EventItem';

export default function Events() {
  const events = useEventsStore((state) => state.events);

  return (
    <div>
      <SubTitle>Events</SubTitle>
      {events.map((event) => <EventItem data={event} />)}
    </div>
  );
}
