import React, { Component } from 'react';

import './HarnessBase.scss';

class HarnessBase extends Component {
  render() {
    return <div className="harness-container" id="harness-container">
      {this.props.children}
    </div>;
  }
}

export default HarnessBase;
