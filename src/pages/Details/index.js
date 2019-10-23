import React from 'react';
import PropTypes from 'prop-types';
import { MdEdit, MdDelete, MdEvent, MdPlace } from 'react-icons/md';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Container, Header, Banner, Content, InfoFooter } from './styles';

import history from '~/services/history';

export default function Details({ location }) {
  const { meetup } = location.state;

  function handleEdit() {
    history.push(`/edit-meetup/${meetup.id}`, { meetup });
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
        <img src={meetup.File.url} alt="" />
      </Banner>
      <Content>
        <p>{meetup.description}</p>
        <p>
          Caso queira participar como palestrante do meetup, envie um email para
          :{` ${meetup.User.email}`}
        </p>
      </Content>
      <InfoFooter>
        <span>
          <MdEvent size={20} color="#FFF" />
          {format(parseISO(meetup.date), "d 'de' MMMM', às' HH':'mm", {
            locale: pt,
          })}
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
  location: PropTypes.shape({
    state: PropTypes.shape({
      meetup: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        location: PropTypes.string,
        date: PropTypes.instanceOf(Date),
        File: PropTypes.shape({
          url: PropTypes.string,
        }),
        User: PropTypes.shape({
          email: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
};
