import React, { Component } from 'react';

import RingaComponent from '../../src/components/RingaComponent';

import './HarnessBase.scss';

class HarnessBase extends RingaComponent {
  render() {
    return <div className={this.calcClassnames('harness-container')} id="harness-container">
      {this.props.children}
    </div>;
  }
}

export default HarnessBase;
