import { esHost } from './contants';

function esUrl(parts = {}) {
  const { path, query } = parts;

  if (path) {
    return esHost + '/' path;
  }

  return esHost;
}

export {
  esUrl,
}