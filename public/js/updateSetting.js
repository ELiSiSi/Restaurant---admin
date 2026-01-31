import { showAlert } from './alerts.js';

export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'data'
        ? '/api/v1/users/updateMe'
        : '/api/v1/users/updatePassword';

    let headers = {};
    let body;

    if (type === 'data' && data instanceof FormData) {

      body = data;

    } else {

      headers = { 'Content-Type': 'application/json' };
      body = JSON.stringify(data);
    }

    const res = await fetch(url, {
      method: 'PATCH',
      headers,
      body,
      credentials: 'include',
    });

    const resData = await res.json();

    if (res.ok && resData.status === 'success') {
      showAlert('success', `${type} updated successfully!`);
      
      if (type === 'data') {
        window.setTimeout(() => location.reload(), 1500);
      }
    } else {
      showAlert('error', resData.message || 'Update failed!');
    }
  } catch (err) {
    showAlert('error', err.message || 'Something went wrong!');
    console.error(err);
  }
};
