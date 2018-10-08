import { esHost } from '../contants';

function esUrl(parts = {}) {
  const { path, query } = parts;

  if (path) {
    return esHost + path;
  }

  return esHost;
}

function configureClientError() {
  return Promise.reject('You have to configure an http client for lib/api/http');
}

const errorHttpClient = {
  post: configureClientError,
  get: configureClientError,
  put: configureClientError,
}

export {
  esUrl,
  errorHttpClient,
}