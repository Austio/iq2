import React from 'react';

import AnalyzedRow from './analyzedRow';

import {
  EuiHeader,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTable,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableBody,
} from '@elastic/eui';

import PropTypes from 'prop-types';

import analyzeToken from './analyzeToken';

function getKey({ text, analyzer }) {
  return `${text}____${analyzer}`;
}

export default class AnalyzedTokensTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text || '',
      results: {},
      analyzers: ['standard', 'simple', 'whitespace', 'stop', 'keyword', 'pattern', 'snowball'],
    };

    this.analyzeText = this.analyzeText.bind(this);
    this.buildPromises = this.buildPromises.bind(this);
    this.requestTokens = analyzeToken(this.props.httpClient);
  }

  componentWillReceiveProps(props) {
    const { text } = props;
    
    if (text != undefined && text != "") {
      this.analyzeText(text);
    }
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

  analyzeText(text) {
    this.setState({ text });

    return this.buildPromises(text)
      .catch(r => console.warn(r));
  }

  render() {
    const { text, analyzers } = this.state;

    const tableTokenRows = analyzers.map(analyzer => {
      const key = getKey({ text, analyzer });

      const analyzerResult = this.state.results[key];
      if (!analyzerResult) return;

      const tokens = analyzerResult.data.tokens;

      return <AnalyzedRow key={key} tokens={tokens} analyzer={analyzer} />
    });

    return (
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiHeader>Results for {this.state.text}</EuiHeader>

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
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}

AnalyzedTokensTable.propTypes = {
  text: PropTypes.string,
  httpClient: PropTypes.function,
};
