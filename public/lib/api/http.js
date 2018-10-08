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

/*
curl -XGET 'http://localhost:9200/_analyze' -H "Content-Type:application/json" -d '
{
  "analyzer": "english",
  "text": "silly silliness sillying sillied",
  "tokenizer": "lowercase"
}
'
Full Options Here, looks like it also takes an object
https://github.com/elastic/elasticsearch/blob/99f88f15c5febbca2d13b5b5fda27b844153bf1a/server/src/main/java/org/elasticsearch/rest/action/admin/indices/RestAnalyzeAction.java#L104
 */
function fetchTextTokens({ text, analyzer, tokenizer }) {
  const analyzeOptions = { text };

  if (analyzer) analyzeOptions.analyzer = analyzer;
  if (tokenizer) analyzeOptions.tokenizer = tokenizer;

  return httpClient.post(esUrl({ path: '/_analyze'}), analyzeOptions);
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
