import React from 'react';

export default class Analyzer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: {
        positon: 5
      },
      tokenizer: {
        query: "Query",
      }
    };
  }

  render() {
    return (
      <div className="container-fluid" id="content" ng-controller="TokenizerCtrl">
        <div className="row-fluid">
          <div className="span8 offset2">
            <form>
              <fieldset>
                <textarea rows="2" ng-model="tokenizer.query">{this.state.tokenizer.query}</textarea><br/>
              </fieldset>
            </form>
          </div>
        </div>
        <div className="row-fluid">
          <div className="span10 offset1">
            <table className="table table-bordered">
              <thead>
              <tr>
                <td >Analyzer</td>
                <td>Tokenized Text</td>
              </tr>
              </thead>
              <tbody>
              <tr ng-repeat="t in tokenizer.tokenizers">
                <td>t</td>
                <td>
                  <div className="label" ng-repeat="token in tokenizer.ttext[t]">
                    <div>
                      <span ng-bind-html-unsafe="token.token"></span>&nbsp;
                      <span>{this.state.token.position}</span>
                    </div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
