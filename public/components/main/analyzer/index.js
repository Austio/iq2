import React from 'react';

import { ENTER } from '../../../lib/keyCodes';

import AnalyzedRow from './analyzedRow';

import {
  EuiForm,
  EuiFormRow,
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
      tokens: [],
      analyzer: "standard",
    };

    this.setQuery = this.setQuery.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  submitQuery(event) {
    event.preventDefault();

    analyzeToken(this.props.httpClient)(this.state.query)
      .then(r => {
        this.setState({ tokens: r.data.tokens });
      })
      .catch(r => console.warn(r));
  }

  onKeyDown(e) {
    if (e.keyCode === ENTER) {
      this.submitQuery(e);
    }
  }

  setQuery(event) {
    this.setState({ query: event.target.value });
  }

  render() {
    const tableTokenRows = <AnalyzedRow key={this.state.analyzer} tokens={this.state.tokens} analyzer={this.state.analyzer} />

    return (
      <div>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFieldText
              placeholder="Enter Something To Tokenize..."
              fullWidth
              onKeyDown={this.onKeyDown}
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