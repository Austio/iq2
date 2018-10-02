// TokenizerCtrl
import { esUrl } from '../../../lib/helper';

const url = esUrl({ path: "/_analyze"});

// {
//   "tokens": [
//   {
//     "token": "foo",
//     "start_offset": 0,
//     "end_offset": 3,
//     "type": "<ALPHANUM>",
//     "position": 0
//   },
//   {
//     "token": "bar",
//     "start_offset": 4,
//     "end_offset": 7,
//     "type": "<ALPHANUM>",
//     "position": 1
//   },
//   {
//     "token": "baz",
//     "start_offset": 8,
//     "end_offset": 11,
//     "type": "<ALPHANUM>",
//     "position": 2
//   }
// ]
// }

export default function analyzeText(http) {
  return function analyzeToken(text: "keyword foo bar baz", analyzer: "standard") {
    return http.post(url, {
      analyzer,
      text,
    });
  };
}
