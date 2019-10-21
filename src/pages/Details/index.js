import React from 'react';
import PropTypes from 'prop-types';
import { MdEdit, MdDelete, MdEvent, MdPlace } from 'react-icons/md';

import { Container, Header, Banner, Content, InfoFooter } from './styles';

export default function Details({ location }) {
  const { meetup } = location.state;

  return (
    <Container>
      <Header>
        <strong> {meetup.title}</strong>
        <div id="buttons">
          <button id="edit" type="button">
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
  location: PropTypes.shape({
    state: PropTypes.shape({
      meetup: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        location: PropTypes.string,
        formattedDate: PropTypes.string,
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
