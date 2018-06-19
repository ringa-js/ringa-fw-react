import React from 'react';

import HarnessBase from '../HarnessBase';
import CodeExample from '../../../src/components/complex/CodeExample';
import Panel from '../../../src/components/containers/Panel';

import './ModalHarness.scss';

import ModalExample1 from './ModalExample1';
import ModalExample1Code from './ModalExample1.txt';

class ModalHarness extends HarnessBase {
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
      <div className="modal-harness">
        {this.renderHeader('modal.title', '^0.0.7', 'modal.description', 'import {Modal} from \'ringa-fw-react\'', 'https://github.com/ringa-js/ringa-fw-react/blob/master/src/components/modal/ModalModel.js')}
        <Panel label="Basic">
          <CodeExample code={ModalExample1Code} classes="fill">
            <ModalExample1 />
          </CodeExample>
        </Panel>
      </div>
    </div>;
  }
}

export default ModalHarness;
