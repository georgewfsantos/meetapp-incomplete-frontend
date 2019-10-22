import { takeLatest, call, put, all } from 'redux-saga/effects';
import { isBefore, format, parseISO } from 'date-fns/esm';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { getMeetupsSuccess, meetupFailure, newMeetupSuccess } from './actions';

export function* getMeetups() {
  try {
    const response = yield call(api.get, 'meetups');
    const meetups = response.data.map(meetup => ({
      ...meetup,
      past: isBefore(parseISO(meetup.date), new Date()),
      formattedDate: format(
        parseISO(meetup.date),
        "dd 'de' MMMM, 'às ' HH'h'",
        { locale: pt }
      ),
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
      formattedDate: format(parseISO(date), "d 'de' MMMM', às' HH':'mm", {
        locale: pt,
      }),
      location,
    };

    const response = yield call(api.post, 'meetups', meetup);
    yield put(newMeetupSuccess(response.data));
    toast.success('Meetup cadastrado com sucesso');
    history.push('dashboard');
  } catch (err) {
    toast.error(
      'Não foi possível cadastrar seu meetup. Verifique os dados informados'
    );
    yield put(meetupFailure());
  }
}

export default all([
  takeLatest('@meetup/GET_MEETUPS_REQUEST', getMeetups),
  takeLatest('@meetup/NEW_MEETUP_REQUEST', createNewMeetup),
]);
