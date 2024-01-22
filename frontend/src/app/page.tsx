// Login.js
"use client"
import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log('data', data)
      if (response.ok) {
        console.log('Login successful');
        const setCookieHeader = response.headers.get('Set-Cookie');
        console.log(setCookieHeader)
        if (setCookieHeader) {
          // Parse the cookie header to get the cookie value
          const authToken = setCookieHeader.split(';')[0].split('=')[1];
          console.log('Auth Token:', authToken);
        } else {
          console.log('no setCookieHeader')
        }
        // Handle successful login, e.g., redirect to another page
      } else {
        console.error('Login failed');
        // Handle failed login, e.g., show an error message
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle network errors or other issues
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
