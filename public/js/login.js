/* eslint-disable */
import { showAlert } from './alerts.js';

export const login = async (email, password) => {
  try {
    const res = await fetch('/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    } else {
      showAlert('error', data.message || 'Login failed!');
    }
  } catch (err) {
    showAlert('error', 'Connection error. Please try again.');
    console.error('Login error:', err);
  }
};

export const logout = async () => {
  try {
    const res = await fetch('/api/v1/users/logout', {
      method: 'GET',
    });

    const data = await res.json();

    if (res.ok && data.status === 'success') {
      showAlert('success', 'Logged out successfully!');
      window.setTimeout(() => {
        location.reload(true);
      }, 500);

      location.assign('/');
    } else {
      showAlert('error', 'Logout failed!');
    }
  } catch (err) {
    console.log(err);
    showAlert('error', 'Error logging out! Try again.');
  }
};
