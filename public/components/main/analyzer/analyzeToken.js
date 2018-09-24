// TokenizerCtrl
import { esUrl } from '../../../lib/helper';

const url = esUrl({ path: "/_analyze?tokenizer "});

function analyzeToken(text) {
  return function analyzeWithTokenizer(tokenizer) {
    // def analyze(data, analyzer="standard"):
    // d = {
    //   "analyzer": analyzer,
    //   "text": data
    // }
    // url = 'http://localhost:9200/_analyze?format=yaml'
    // print requests.get(url, data=json.dumps(d), headers=headers).text

  }
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
