import React from 'react';

import HarnessBase from '../HarnessBase';
import CodeExample from '../../../src/components/complex/CodeExample';
import Panel from '../../../src/components/containers/Panel';

import './ScrollContainerHarness.scss';

import ScrollContainerExample1 from './ScrollContainerExample1';
import ScrollContainerExample1Code from './ScrollContainerExample1.txt';

class ScrollContainerHarness extends HarnessBase {
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
      <div className="scroll-container-harness fill">
        {this.renderHeader('scrollContainer.title', '^0.0.7', 'scrollContainer.description', 'import {ScrollContainer} from \'ringa-fw-react\'', 'https://github.com/ringa-js/ringa-fw-react/blob/master/src/components/containers/ScrollContainer.jsx')}
        <Panel label="Basic" classes="fill">
          <CodeExample code={ScrollContainerExample1Code} classes="fill">
            <ScrollContainerExample1 />
          </CodeExample>
        </Panel>
      </div>
    </div>;
  }
}

export default ScrollContainerHarness;
