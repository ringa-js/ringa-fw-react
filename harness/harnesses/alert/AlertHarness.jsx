import React from 'react';

import HarnessBase from '../HarnessBase';
import CodeExample from '../../../src/components/complex/CodeExample';
import Panel from '../../../src/components/containers/Panel';

import './AlertHarness.scss';

import AlertExample1 from './AlertExample1';
import AlertExample1Code from './AlertExample1.txt';

class AlertHarness extends HarnessBase {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor() {
    super();
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    return <div className="harness-wrapper">
      <div className="alert-harness">
        {this.renderHeader('alert.title', '^0.0.12', 'alert.description', 'import {Alert} from \'ringa-fw-react\'', 'https://github.com/ringa-js/ringa-fw-react/blob/master/src/components/complex/Alert.jsx')}
        <Panel label="Basic">
          <CodeExample code={AlertExample1Code} classes="fill">
            <AlertExample1 />
          </CodeExample>
        </Panel>
      </div>
    </div>;
  }
}

export default AlertHarness;
