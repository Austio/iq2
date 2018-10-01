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

function TokenizerCtrl($scope, $http, Tokenizer, Data){

  $scope.analyze = function(tokenizer) {
    var path = $scope.data.host + "/_analyze?tokenizer=" + tokenizer;

    $http.post(path, $scope.tokenizer.query)
      .success(function(response){
        var tokens = [];
        for(i in response.tokens){
          var token = response.tokens[i];

          //bootstrap labels do silly things with only a single space
          if (token.token === ' ') {token.token = "&nbsp;";}

          tokens.push(token);
        }
        $scope.tokenizer.ttext[tokenizer] = tokens;

      })
      .error(function(data, status, headers, config){
        //console.log(data);

      });
  }

}
