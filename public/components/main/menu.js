import React, {
  Component,
} from 'react';

import {
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
} from '@elastic/eui';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  renderLogo() {
    return (
      <EuiHeaderLogo iconType="logoKibana" href="#" aria-label="Go to home page" />
    );
  }
  render() {
    return (
      <EuiHeader>
        <EuiHeaderSection>
          <EuiHeaderSectionItem border="right">
            {this.renderLogo()}
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
    );
  }
}