import { esUrl, errorHttpClient } from './helper';

let httpClient = errorHttpClient;

function setHttpClient(client) {
  httpClient = client;
}

/*
fetchTextTokens Returned Shape
{
  'tokens': [
    {
      'token': 'foo',
      'start_offset': 0,
      'end_offset': 3,
      'type': '<ALPHANUM>',
      'position': 0
    }
  ]
}
*/
function fetchTextTokens({ text, analyzer }) {
  return httpClient.post(esUrl({ path: '/_analyze'}), {
    analyzer,
    text,
  });
}


/*
Returned
{"omdb":{"mappings":{}}}
*/

const mappings = (function() {
  const url = esUrl({ path: '/_mapping' });
  let mappings = null;

  /*
    fetchMappings Returned
    {"omdb":{"mappings":{}}}
  */

  function fetchMappings() {
    if (mappings != null) {
      Promise.resolve(mappings)
    }

    return httpClient
      .get(url)
      .then(r => {
        mappings = r;
        return r;
      });
  }

  function indices() {
    return fetchMappings()
      .then(r => r.data)
      .then(Object.keys)
  }
  
  return {
    indices,
    fetchMappings,
  };
}());


const api = {
  setHttpClient,
  fetchTextTokens,
  mappings,
}

window.__api__ = api;

export default api;
