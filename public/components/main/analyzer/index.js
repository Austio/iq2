import React from 'react';

import { ENTER } from '../../../lib/keyCodes';

import AnalyzedRow from './analyzedRow';

import {
  EuiForm,
  EuiHeader,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFieldSearch,
  EuiButton,
  EuiTable,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableBody,
  EuiTableRow,
  EuiTableRowCell
} from '@elastic/eui';

import PropTypes from 'prop-types';

function isUndefined(value) {
  return typeof value === 'undefined';
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

import analyzeToken from './analyzeToken';

function getKey({ text, analyzer }) {
  return `${text}____${analyzer}`;
}

export default class Analyzer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      querySubmitted: '',
      queryInput: 'the quick fox jumped over the lazy brown dog',
      tokens: [],
      results: {},
      analyzers: ['standard', 'simple', 'whitespace', 'stop', 'keyword', 'pattern', 'snowball'],
    };

    this.setQueryInput = this.setQueryInput.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.buildPromises = this.buildPromises.bind(this);
    this.requestTokens = analyzeToken(this.props.httpClient);
  }

  buildPromises(text) {
    const requests = this.state.analyzers.map(analyzer => {
      return this.requestTokens({
        analyzer,
        text,
      }).then(response => {
        this.setState({
          results: {
            ...this.state.results,
            [getKey({ text, analyzer })]: response,
          }
        });

        return response;
      });
    });

    return Promise.all(requests);
  }

  submitQuery(event) {
    event.preventDefault();

    const querySubmitted = this.state.queryInput;

    this.setState({ querySubmitted });

    return this.buildPromises(querySubmitted)
      .catch(r => console.warn(r));
  }

  onKeyDown(e) {
    if (e.keyCode === ENTER) {
      this.submitQuery(e);
    }
  }

  setQueryInput(event) {
    this.setState({ queryInput: event.target.value });
  }

  render() {
    const text = this.state.querySubmitted;

    const tableTokenRows = this.state.analyzers.map(analyzer => {
      const key = getKey({ text, analyzer });

      const analyzerResult = this.state.results[key];
      if (!analyzerResult) return;

      const tokens = analyzerResult.data.tokens;

      return <AnalyzedRow key={key} tokens={tokens} analyzer={analyzer} />
    });

    return (
      <div>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFieldText
              placeholder='Enter Something To Tokenize...'
              fullWidth
              onKeyDown={this.onKeyDown}
              onChange={this.setQueryInput}
              value={this.state.queryInput}
            />
            <EuiButton
              onClick={this.submitQuery}
            >
              Submit
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiHeader>Results for {this.state.querySubmitted}</EuiHeader>

        <EuiTable>
          <EuiTableHeader>
            <EuiTableHeaderCell>
              Analyzer
            </EuiTableHeaderCell>
            <EuiTableHeaderCell>
              Tokens
            </EuiTableHeaderCell>
          </EuiTableHeader>
          <EuiTableBody>
            {tableTokenRows}
          </EuiTableBody>
        </EuiTable>
      </div>
    );
  }
}

Analyzer.propTypes = {
  httpClient: PropTypes.function
};