import React from 'react';

import HarnessBase from '../HarnessBase';
import CodeExample from '../../../src/components/complex/CodeExample';
import Panel from '../../../src/components/containers/Panel';

import './RadioButtonHarness.scss';

import RadioButtonExample1 from './RadioButtonExample1';
import RadioButtonExample1Code from './RadioButtonExample1.txt';

class RadioButtonHarness extends HarnessBase {
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
      <div className="radioButton-harness">
        {this.renderHeader('radioButton.title', '^0.0.12', 'radioButton.description', 'import {RadioButton} from \'ringa-fw-react\'', 'https://github.com/ringa-js/ringa-fw-react/blob/master/src/components/input/RadioButton.jsx')}
        <Panel label="Basic">
          <CodeExample code={RadioButtonExample1Code} classes="fill">
            <RadioButtonExample1 />
          </CodeExample>
        </Panel>
      </div>
    </div>;
  }
}

export default RadioButtonHarness;
