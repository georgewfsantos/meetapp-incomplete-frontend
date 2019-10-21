import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  DashHeader,
  MeetupInfo,
  MeetupList,
  EmptyList,
} from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('/meetups');

      const data = response.data.map(meetup => ({
        ...meetup,
        formattedDate: format(
          parseISO(meetup.date),
          "d 'de' MMMM', às' HH':'mm'h'",
          { locale: pt }
        ),
      }));
      setMeetups(data);
    }

    loadMeetups();
  }, []);

  function handleDetails(meetup) {
    history.push('/details', { meetup });
  }

  function handleNewMeetup() {
    history.push('/new-meetup');
  }
  return (
    <Container>
      <DashHeader>
        <strong> Meus Meetups</strong>
        <button type="button" onClick={handleNewMeetup}>
          <MdAddCircleOutline size={20} color="#FFF" /> Novo Meetup
        </button>
      </DashHeader>
      <MeetupList>
        {meetups.length > 0 ? (
          meetups.map(meetup => (
            <MeetupInfo key={meetup.id}>
              <strong>{meetup.title}</strong>
              <span>{meetup.formattedDate}</span>
              <button type="button" onClick={() => handleDetails(meetup)}>
                <MdChevronRight size={20} color="#FFF" />
              </button>
            </MeetupInfo>
          ))
        ) : (
          <EmptyList> Nope</EmptyList>
        )}
      </MeetupList>
    </Container>
  );
}
