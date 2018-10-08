import { esUrl, errorHttpClient } from './helper';

let httpClient = errorHttpClient;

function setHttpClient(client) {
  httpClient = client;
}

function fetchTextTokens({ text, analyzer }) {
  return httpClient.post(esUrl({ path: '/_analyze'}), {
    analyzer,
    text,
  });
}

const api = {
  setHttpClient,
  fetchTextTokens,
}

export default api;
