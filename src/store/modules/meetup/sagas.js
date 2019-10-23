import { takeLatest, call, put, all } from 'redux-saga/effects';
import { isBefore, parseISO } from 'date-fns/esm';

import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  getMeetupsSuccess,
  meetupFailure,
  newMeetupSuccess,
  editMeetupSuccess,
} from './actions';

export function* getMeetups() {
  try {
    const response = yield call(api.get, 'meetups');
    const meetups = response.data.map(meetup => ({
      ...meetup,
      past: isBefore(parseISO(meetup.date), new Date()),
    }));

    yield put(getMeetupsSuccess(meetups));
  } catch (err) {
    toast.error('Não foi possível listar seus meetups.');
    yield put(meetupFailure());
  }
}

export function* createNewMeetup({ payload }) {
  const { file_id, title, description, date, location } = payload.data;
  try {
    const meetup = {
      file_id,
      title,
      description,
      date,
      location,
    };

    const response = yield call(api.post, 'meetups', meetup);
    yield put(newMeetupSuccess(response.data));
    toast.success('Meetup cadastrado com sucesso');
    history.push('dashboard');
  } catch (err) {
    const { message } = err;
    toast.error(
      `Não foi possível cadastrar seu meetup. Verifique os dados informados ${message}`
    );
    yield put(meetupFailure());
  }
}

export function* editMeetup({ payload }) {
  const { id, title, description, date, location, file_id } = payload.data;

  const meetup = {
    title,
    description,
    date,
    location,
    file_id,
  };

  try {
    const response = yield call(api.put, `meetups/${id}`, meetup);
    toast.success(`${meetup.title} has been updated successfully`);
    history.push(`/details/${id}`);
    yield put(editMeetupSuccess(response.data));
  } catch (err) {
    const { message } = err;

    toast.error(`The meetup could not be updated'. ${message}`);
  }
}

export default all([
  takeLatest('@meetup/GET_MEETUPS_REQUEST', getMeetups),
  takeLatest('@meetup/NEW_MEETUP_REQUEST', createNewMeetup),
  takeLatest('@meetup/EDIT_MEETUP_REQUEST', editMeetup),
]);
