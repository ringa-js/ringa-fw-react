import React from 'react';
import {Panel} from '../../../src/index';

import HarnessBase from '../HarnessBase';
import CodeExample from '../../../src/components/complex/CodeExample';

import './FormHarness.scss';

import FormExample1Code from './FormExample1.txt';
import FormExample1 from './FormExample1';

import FormExample2Code from './FormExample2.txt';
import FormExample2 from './FormExample2';

import FormForceValidateExampleCode from './FormForceValidateExample.txt';
import FormForceValidateExample from './FormForceValidateExample';

class FormHarness extends HarnessBase {
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
    return <div className="harness-wrapper form-harness">
      {this.renderHeader('form.title', '^0.0.8', 'form.description', 'import {Form} from \'ringa-fw-react\'', 'https://github.com/ringa-js/ringa-fw-react/blob/master/src/components/form/Form.jsx')}
      <Panel label="Basic">
        <CodeExample code={FormExample1Code}>
          <FormExample1 />
        </CodeExample>
      </Panel>
      <Panel label="Validation">
        <CodeExample code={FormExample2Code}>
          <FormExample2 />
        </CodeExample>
      </Panel>
      <Panel label="Force Validation">
        <CodeExample code={FormForceValidateExampleCode}>
          <FormForceValidateExample />
        </CodeExample>
      </Panel>
    </div>;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  formSubmit_onClickHandler() {
    console.log('Submitted!');

    this.formModel.message = 'Form has been submitted!';
  }
}

export default FormHarness;
