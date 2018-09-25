import React from 'react';

import {
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFieldSearch,
  EuiButton,
} from '@elastic/eui';

import PropTypes from 'prop-types';

function isUndefined(value) {
  return typeof value === "undefined";
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

import analyzeToken from './analyzeToken';

export default class Analyzer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      token: {
        positon: 5
      },
      tokenizer: {
        query: "Query",
      }
    };

    this.setQuery = this.setQuery.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
  }

  submitQuery(event) {
    event.preventDefault();

    analyzeToken(this.props.httpClient)(this.state.query)
      .then(r => console.log(r))
      .catch(r => console.warn(r));
  }

  setQuery(event) {
    this.setState({ query: event.target.value });
  }

  render() {
    return (
      <div ng-controller="TokenizerCtrl">
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFieldText
              placeholder="Enter Something To Tokenize..."
              fullWidth
              onChange={this.setQuery}
              value={this.state.query}
            />
            <EuiButton
              onClick={this.submitQuery}
            >
              Submit
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>

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

Analyzer.propTypes = {
  httpClient: PropTypes.function
};