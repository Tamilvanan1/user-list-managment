import React from 'react';

const UserCard = ({ user, onEdit, onDelete }) => (
  <div className="card">
    <img src={user.avatar} alt="" />
    <h4>{user.first_name} {user.last_name}</h4>
    <p>{user.email}</p>
    <div className="card-actions">
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  </div>
);

export default UserCard;
