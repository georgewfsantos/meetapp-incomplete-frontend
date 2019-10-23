import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import { toast } from 'react-toastify';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import history from '~/services/history';

import { getMeetupsRequest } from '~/store/modules/meetup/actions';

import {
  Container,
  DashHeader,
  MeetupInfo,
  MeetupList,
  EmptyList,
} from './styles';

export default function Dashboard() {
  const dispatch = useDispatch();
  const meetups = useSelector(state => state.meetup.meetups);

  useEffect(() => {
    async function loadMeetups() {
      try {
        dispatch(getMeetupsRequest());
      } catch (err) {
        toast.error('Não foi possível carregar a listagem de meetups');
      }
    }

    loadMeetups();
  }, [dispatch]);

  function handleDetails(meetup) {
    history.push(`/details/${meetup.id}`, { meetup });
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
              <span>
                {format(parseISO(meetup.date), "d 'de' MMMM', às' HH':'mm", {
                  locale: pt,
                })}
              </span>
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
