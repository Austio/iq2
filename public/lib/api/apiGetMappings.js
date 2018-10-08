// TokenizerCtrl
import { esUrl } from '../../lib/helper';

const url = esUrl({ path: '/_mapping' });

export default function analyzeText(http) {
  let mappings = null;

  function getMapping() {
    if (mappings != null) {
      Promise.resolve(mappings)
    }

    return http
      .get(url)
      .then(r => {
        mappings = r;
        return r;
      });
  }

  function listIndices() {
    return getMappings()
      .then(r => {
        Object.keys(r)
      });
  }

  return {
    getMapping,
    listIndices,
  };
}

/*
Returned
{"omdb":{"mappings":{}}}
*/