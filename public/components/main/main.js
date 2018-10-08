import React from 'react';
import {
  EuiPage,
} from '@elastic/eui';

import IQMenu from './menu';
import IQAnalyzer from '../analyzer/index';
// import IQTokenizer from '../tokenizer/index';

import http from '../../lib/api/http';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.httpClient = http;
    this.httpClient.setHttpClient(props.httpClient);
  }

  componentWillReceiveProps(props) {
    if (props.httpClient) {
      this.$http.setHttpClient(props.httpClient);
    }
  }

  componentDidMount() {
    /*
       FOR EXAMPLE PURPOSES ONLY.  There are much better ways to
       manage state and update your UI than this.
    */
    const { httpClient } = this.props;
    httpClient.get('../api/iq2/example').then((resp) => {
      this.setState({ time: resp.data.time });
    });
  }
  render() {
    return (
      <EuiPage>
        <IQMenu />
        {/*<IQTokenizer httpClient={this.props.httpClient}/>*/}
        <IQAnalyzer httpClient={this.httpClient}/>
      </EuiPage>
    );
  }
}
