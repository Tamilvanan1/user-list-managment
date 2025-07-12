import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  setView,
  setFilter,
  openModal,
  removeUser,
} from './usersSlice';
import UserCard from './UserCard';
import UserModal from './UserModal';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';

const UsersList = () => {
  const dispatch = useDispatch();
  const { list, page, totalPages, loading, error, view, filter, modal } =
    useSelector(s => s.users);

  useEffect(() => { dispatch(fetchUsers(page)); }, [dispatch, page]);

  const filtered = list?.filter(u =>
    `${u.first_name} ${u.last_name}`.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="users-container">
      <div className="toolbar">
        <input
          value={filter}
          onChange={e => dispatch(setFilter(e.target.value))}
          placeholder="Search by name"
        />
        <button onClick={() => dispatch(setView(view === 'list' ? 'card' : 'list'))}>
          {view === 'list' ? 'Card View' : 'List View'}
        </button>
        <button onClick={() => dispatch(openModal(null))}>+ Add User</button>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          {view === 'list' ? (
            <table className="list-table">
              <thead>
                <tr><th>Avatar</th><th>Name</th><th>Email</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filtered?.map(u => (
                  <tr key={u.id}>
                    <td><img src={u.avatar} alt="" /></td>
                    <td>{u.first_name} {u.last_name}</td>
                    <td>{u.email}</td>
                    <td>
                      <button onClick={() => dispatch(openModal(u))}>Edit</button>
                      <button onClick={() => window.confirm('Delete?') && dispatch(removeUser(u.id))}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="cards">
              {filtered?.map(u => (
                <UserCard
                  key={u.id}
                  user={u}
                  onEdit={() => dispatch(openModal(u))}
                  onDelete={() => window.confirm('Delete?') && dispatch(removeUser(u.id))}
                />
              ))}
            </div>
          )}
          <Pagination page={page} total={totalPages} onPageChange={p => dispatch(fetchUsers(p))} />
        </>
      )}

      {modal.open && <UserModal user={modal.user} />}
    </div>
  );
};

export default UsersList;
