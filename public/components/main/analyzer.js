import React from 'react';

import { ENTER } from '../../lib/keyCodes';

import {
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
} from '@elastic/eui';

import PropTypes from 'prop-types';

import AnalyzedTokensTable from '../analyzer/analyzedTokensTable';

export default class Analyzer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      querySubmitted: '',
      queryInput: 'the quick fox jumped over the lazy brown dog',
    };

    this.setQueryInput = this.setQueryInput.bind(this);
    this.setQuerySubmitted = this.setQuerySubmitted.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  setQuerySubmitted(event) {
    event.preventDefault();

    const querySubmitted = this.state.queryInput;

    this.setState({ querySubmitted });
  }

  onKeyDown(e) {
    if (e.keyCode === ENTER) {
      this.setQuerySubmitted(e);
    }
  }

  setQueryInput(event) {
    this.setState({ queryInput: event.target.value });
  }

  render() {
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
              onClick={this.setQuerySubmitted}
            >
              Submit
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>

        <AnalyzedTokensTable text={this.state.querySubmitted} httpClient={this.props.httpClient}/>
      </div>
    );
  }
}

Analyzer.propTypes = {
  httpClient: PropTypes.function
};