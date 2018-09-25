import React from 'react';
import {
  EuiPage,
} from '@elastic/eui';

import IQMenu from './menu';
import IQAnalyzer from './analyzer/index';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        <IQAnalyzer httpClient={this.props.httpClient}/>
      </EuiPage>
    );
  }
}
