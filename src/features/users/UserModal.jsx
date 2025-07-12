import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser, editUser, closeModal } from './usersSlice';

const UserModal = ({ user }) => {
  const [first_name, setFirst] = useState(user?.first_name || '');
  const [last_name, setLast] = useState(user?.last_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();
    if (!first_name || !last_name || !email) return alert('All fields required');
    const payload = { first_name, last_name, email };
    user ? dispatch(editUser(user.id, payload)) : dispatch(createUser(payload));
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{user ? 'Edit User' : 'Create User'}</h3>
        <form onSubmit={onSubmit}>
          <input value={first_name} onChange={e => setFirst(e.target.value)} placeholder="First Name" />
          <input value={last_name} onChange={e => setLast(e.target.value)} placeholder="Last Name" />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" />
          <div className="buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={() => dispatch(closeModal())}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
