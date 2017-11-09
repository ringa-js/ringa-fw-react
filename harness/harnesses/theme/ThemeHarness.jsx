import React from 'react';

import HarnessBase from '../HarnessBase';
import CodeExample from '../../../src/components/complex/CodeExample';
import Panel from '../../../src/components/containers/Panel';

import './ThemeHarness.scss';

import ThemeExample1 from './ThemeExample1';
import ThemeExample1Code from './ThemeExample1.txt';

class ThemeHarness extends HarnessBase {
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
      <div className="theme-harness fill">
        {this.renderHeader('theme.title', '^0.0.7', 'theme.description', 'import {Theme} from \'ringa-fw-react\'', 'https://github.com/ringa-js/ringa-fw-react/blob/master/src/components/containers/Theme.jsx')}
        <Panel label="Switch Themes" classes="fill">
          <CodeExample code={ThemeExample1Code} classes="fill">
            <ThemeExample1 />
          </CodeExample>
        </Panel>
      </div>
    </div>;
  }
}

export default ThemeHarness;
