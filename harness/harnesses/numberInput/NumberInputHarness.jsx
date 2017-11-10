import React from 'react';

import HarnessBase from '../HarnessBase';
import CodeExample from '../../../src/components/complex/CodeExample';
import Panel from '../../../src/components/containers/Panel';

import './NumberInputHarness.scss';

import NumberInputExample1 from './NumberInputExample1';
import NumberInputExample1Code from './NumberInputExample1.txt';

import NumberInputExample2 from './NumberInputExample2';
import NumberInputExample2Code from './NumberInputExample2.txt';

class NumberInputHarness extends HarnessBase {
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
        {this.renderHeader('numberInput.title', '^0.0.12', 'numberInput.description', 'import {NumberInput} from \'ringa-fw-react\'', 'https://github.com/ringa-js/ringa-fw-react/blob/master/src/components/input/NumberInput.jsx')}
        <Panel label="Basic">
          <CodeExample code={NumberInputExample1Code} classes="fill">
            <NumberInputExample1 />
          </CodeExample>
        </Panel>
        <Panel label="Model Bound">
          <CodeExample code={NumberInputExample2Code} classes="fill">
            <NumberInputExample2 />
          </CodeExample>
        </Panel>
      </div>
    </div>;
  }
}

export default NumberInputHarness;
