import React from 'react';

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

export default class AnalyzedRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      analyzer: props.analyzer,
      tokens: [],
    };
  }

  componentWillReceiveProps(props) {
    this.state.tokens = props.tokens;
  }

  render() {
    if (this.state.tokens.length === 0 && this.query === '') return;

    const tokens = this.state.tokens.map(token => token.token).join(', ');

    return(
      <EuiTableRow>
        <EuiTableRowCell>{this.state.analyzer}</EuiTableRowCell>
        <EuiTableRowCell>{tokens}</EuiTableRowCell>
      </EuiTableRow>
    );
  }
}

AnalyzedRow.propTypes = {
  analyzer: PropTypes.string,
  query: PropTypes.string,
};
