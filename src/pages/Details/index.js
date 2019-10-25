import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MdEdit, MdDelete, MdEvent, MdPlace } from 'react-icons/md';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, Header, Banner, Content, InfoFooter } from './styles';

import api from '~/services/api';

import history from '~/services/history';

export default function Details({ match }) {
  const [meetup, setMeetup] = useState({});

  useEffect(() => {
    async function getMeetup() {
      const response = await api.get(`/meetups/${match.params.id}/details`);

      const meetupDetails = response.data;

      meetupDetails.formattedDate = format(
        parseISO(meetupDetails.date),
        "d 'de' MMMM', às' HH:mm'h'",
        {
          locale: pt,
        }
      );
      setMeetup(meetupDetails);
    }
    getMeetup();
  }, [match.params.id, meetup.date]);

  function handleEdit() {
    history.push(`/edit-meetup/${match.params.id}`);
  }

  return (
    <Container>
      <Header>
        <strong> {meetup.title}</strong>
        <div id="buttons">
          <button id="edit" type="button" onClick={handleEdit}>
            <MdEdit size={20} color="#FFF" /> Editar
          </button>
          <button id="cancel" type="button">
            <MdDelete size={20} color="#FFF" /> Cancelar
          </button>
        </div>
      </Header>
      <Banner>
        <img src={meetup.File && meetup.File.url} alt="" />
      </Banner>
      <Content>
        <p>{meetup.description}</p>
        <p>
          Caso queira participar como palestrante do meetup, envie um email para
          :{` ${meetup.User && meetup.User.email}`}
        </p>
      </Content>
      <InfoFooter>
        <span>
          <MdEvent size={20} color="#FFF" />
          {meetup.formattedDate}
        </span>
        <span>
          <MdPlace size={20} color="#FFF" />
          {meetup.location}
        </span>
      </InfoFooter>
    </Container>
  );
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};
