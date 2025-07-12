import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { loginApi } from '../api/reqres';

export default () => {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async e => {
    e.preventDefault();
    const res = await loginApi(email, password);
    if (res.token) {
      localStorage.setItem('token', res.token);
      router.push('/users');
    } else setError(res.error);
  };

  return (
    <div className="login-page">
      <form onSubmit={onSubmit}>
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
