// fetch.js
const baseUrl = 'http://127.0.0.1:8000/api/';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const baseFetch = async (url, options = {}) => {
  const mergedOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}), // Merge custom headers
    },
  };

  const response = await fetch(`${baseUrl}${url}`, mergedOptions);
  const data = await response.json();
  return data;
};
