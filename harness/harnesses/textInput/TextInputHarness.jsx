import React from 'react';

import HarnessBase from '../HarnessBase';
import CodeExample from '../../../src/components/complex/CodeExample';
import Panel from '../../../src/components/containers/Panel';

import './TextInputHarness.scss';

import TextInputExample1 from './TextInputExample1';
import TextInputExample1Code from './TextInputExample1.txt';
import TextInputExample2 from './TextInputExample2';
import TextInputExample2Code from './TextInputExample2.txt';
import TextInputExampleRequired from './TextInputExampleRequired';
import TextInputExample2Required from './TextInputExampleRequired.txt';

class TextInputHarness extends HarnessBase {
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
        {this.renderHeader('textInput.title', '^0.0.7', 'textInput.description', 'import {TextInput} from \'ringa-fw-react\'', 'https://github.com/ringa-js/ringa-fw-react/blob/master/src/components/input/TextInput.jsx')}
        <Panel label="Basic">
          <CodeExample code={TextInputExample1Code} classes="fill">
            <TextInputExample1 />
          </CodeExample>
        </Panel>
        <Panel label="Model Bound">
          <CodeExample code={TextInputExample2Code} classes="fill">
            <TextInputExample2 />
          </CodeExample>
        </Panel>
        <Panel label="Required">
          <CodeExample code={TextInputExample2Required} classes="fill">
            <TextInputExampleRequired />
          </CodeExample>
        </Panel>
      </div>
    </div>;
  }
}

export default TextInputHarness;
