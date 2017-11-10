import React from 'react';

import HarnessBase from '../HarnessBase';
import CodeExample from '../../../src/components/complex/CodeExample';
import Panel from '../../../src/components/containers/Panel';

import './CheckboxHarness.scss';

import CheckboxExample1 from './CheckboxExample1';
import CheckboxExample1Code from './CheckboxExample1.txt';

import CheckboxExample2 from './CheckboxExample2';
import CheckboxExample2Code from './CheckboxExample2.txt';

class CheckboxHarness extends HarnessBase {
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
      <div className="checkbox-harness">
        {this.renderHeader('checkbox.title', '^0.0.12', 'checkbox.description', 'import {Checkbox} from \'ringa-fw-react\'', 'https://github.com/ringa-js/ringa-fw-react/blob/master/src/components/input/Checkbox.jsx')}
        <Panel label="Basic">
          <CodeExample code={CheckboxExample1Code} classes="fill">
            <CheckboxExample1 />
          </CodeExample>
        </Panel>
        <Panel label="Model Bound">
          <CodeExample code={CheckboxExample2Code} classes="fill">
            <CheckboxExample2 />
          </CodeExample>
        </Panel>
      </div>
    </div>;
  }
}

export default CheckboxHarness;
