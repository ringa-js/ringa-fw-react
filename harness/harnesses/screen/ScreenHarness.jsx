import React from 'react';

import HarnessBase from '../HarnessBase';
import CodeExample from '../../../src/components/complex/CodeExample';
import Panel from '../../../src/components/containers/Panel';

import './ScreenHarness.scss';

import ScreenExample1 from './ScreenExample1';
import ScreenExample1Code from './ScreenExample1.txt';

class ScreenHarness extends HarnessBase {
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
      <div className="screen-harness">
        {this.renderHeader('screen.title', '^0.1.2', 'screen.description', 'import {ScreenModel} from \'ringa-fw-react\'', 'https://github.com/ringa-js/ringa-fw-react/blob/master/src/models/ScreenModel.js')}
        <Panel label="Basic">
          <CodeExample code={ScreenExample1Code} classes="fill">
            <ScreenExample1 />
          </CodeExample>
        </Panel>
      </div>
    </div>;
  }
}

export default ScreenHarness;
