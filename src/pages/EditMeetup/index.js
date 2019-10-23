import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdSave } from 'react-icons/md';

import { parseISO } from 'date-fns';

import { Container } from './styles';
import BannerInput from '~/pages/NewMeetup/BannerInput';
import DatePicker from '~/pages/NewMeetup/DatePicker';
import { editMeetupRequest } from '~/store/modules/meetup/actions';

const schema = Yup.object().shape({
  file_id: Yup.number(),
  title: Yup.string().required('O campo título é obrigatório'),
  description: Yup.string().required('O campo descrição é obrigatório'),
  location: Yup.string().required('O campo localização é obrigatório'),
  date: Yup.date().required('O campo data é obrigatório'),
});

export default function EditMeetup(meetup) {
  const meetUpInfo = {
    ...meetup.location.state.meetup,
  };

  console.log(meetup);

  meetUpInfo.date = parseISO(meetUpInfo.date);

  const dispatch = useDispatch();
  function handleSubmit(data) {
    console.log(data);
    dispatch(editMeetupRequest(data));
  }

  return (
    <Container>
      <Form initialData={meetUpInfo} schema={schema} onSubmit={handleSubmit}>
        <BannerInput name="file_id" />
        <Input name="title" placeholder="Title" />
        <Input name="description" placeholder="description" />
        <DatePicker name="date" placeholder="data" />
        <Input name="location" placeholder="localização" />
        <button type="submit">
          <MdSave size={20} color="#fff" />
          Salvar meetup
        </button>
      </Form>
    </Container>
  );
}
