import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import { MdSave } from 'react-icons/md';

import { toast } from 'react-toastify';
import history from '~/services/history';

import api from '~/services/api';

import { Container } from './styles';
import BannerInput from './BannerInput';

export default function NewMeetup() {
  async function handleSubmit(data) {
    const meetup = {
      ...data,
    };

    try {
      await api.post('meetups', { meetup });
      toast.success(`${meetup.tittle} cadastrado com sucesso.`);
      history.push('/dashboard');
    } catch (err) {
      toast.error('Não foi possível cadastrar o meetup. Verifique os dados');
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <BannerInput name="file_id" />
        <Input name="title" placeholder="Title" />
        <Input name="description" placeholder="description" />
        <Input type="datetime-local" name="data" placeholder="data" />
        <Input name="location" placeholder="localização" />
        <button type="submit">
          <MdSave />
        </button>
      </Form>
    </Container>
  );
}
