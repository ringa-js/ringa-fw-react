import React from 'react';

import HarnessBase from '../HarnessBase';
import CodeExample from '../../../src/components/complex/CodeExample';
import TabNavigator from '../../../src/components/containers/TabNavigator';
import Tab from '../../../src/components/containers/Tab';

import './TextInputHarness.scss';

import TextInputExample1 from './TextInputExample1';
import TextInputExample1Code from './TextInputExample1.txt';
import TextInputExample2 from './TextInputExample2';
import TextInputExample2Code from './TextInputExample2.txt';

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
        <TabNavigator classes="fill">
          <Tab label="Basic">
            <CodeExample code={TextInputExample1Code} classes="fill">
              <TextInputExample1 />
            </CodeExample>
          </Tab>
          <Tab label="Model Bound">
            <CodeExample code={TextInputExample2Code} classes="fill">
              <TextInputExample2 />
            </CodeExample>
          </Tab>
        </TabNavigator>
      </div>
    </div>;
  }
}

export default TextInputHarness;
