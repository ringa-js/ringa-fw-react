import React from 'react';

import HarnessBase from '../HarnessBase';
import CodeExample from '../../../src/components/complex/CodeExample';
import Panel from '../../../src/components/containers/Panel';

import './TabNavigatorHarness.scss';

import TabNavigatorExample1 from './TabNavigatorExample1';
import TabNavigatorExample1Code from './TabNavigatorExample1.txt';

class TabNavigatorHarness extends HarnessBase {
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
      <div className="list-harness">
        {this.renderHeader('tabNavigator.title', '^0.0.7', 'tabNavigator.description', 'import {TabNavigator} from \'ringa-fw-react\'', 'https://github.com/ringa-js/ringa-fw-react/blob/master/src/components/containers/TabNavigator.jsx')}
        <Panel label="Basic">
          <CodeExample code={TabNavigatorExample1Code} classes="fill">
            <TabNavigatorExample1 />
          </CodeExample>
        </Panel>
      </div>
    </div>;
  }
}

export default TabNavigatorHarness;
