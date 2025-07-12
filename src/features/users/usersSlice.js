import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUsersApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
} from '../../api/reqres';

const initialState = {
  list: [],
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
  view: 'list',
  filter: '',
  modal: { open: false, user: null },
};

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    start: state => { state.loading = true; state.error = null; },
    error: (state, { payload }) => { state.loading = false; state.error = payload; },
    setUsers: (state, { payload }) => {
      state.loading = false;
      state.list = payload.data;
      state.page = payload.page;
      state.totalPages = payload.total_pages;
    },
    setView: (state, { payload }) => { state.view = payload; },
    setFilter: (state, { payload }) => { state.filter = payload; },
    openModal: (state, { payload }) => { state.modal = { open: true, user: payload }; },
    closeModal: state => { state.modal = { open: false, user: null }; },
  },
});

export const { start, error, setUsers, setView, setFilter, openModal, closeModal } = slice.actions;
export default slice.reducer;

// Thunks
export const fetchUsers = page => async dispatch => {
  dispatch(start());
  try {
    const data = await fetchUsersApi(page);
    dispatch(setUsers(data));
  } catch (e) {
    dispatch(error(e.message));
  }
};

export const createUser = body => async dispatch => {
  dispatch(start());
  await createUserApi(body);
  dispatch(closeModal());
  dispatch(fetchUsers(1));
};

export const editUser = (id, body) => async dispatch => {
  dispatch(start());
  await updateUserApi(id, body);
  dispatch(closeModal());
  dispatch(fetchUsers(1));
};

export const removeUser = id => async dispatch => {
  dispatch(start());
  await deleteUserApi(id);
  dispatch(fetchUsers(1));
};
