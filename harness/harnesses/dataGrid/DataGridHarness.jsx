import React from 'react';

import HarnessBase from '../HarnessBase';
import CodeExample from '../../../src/components/complex/CodeExample';
import Panel from '../../../src/components/containers/Panel';

import './DataGridHarness.scss';

import DataGridExample1 from './DataGridExample1';
import DataGridExample1Code from './DataGridExample1.txt';

export default class DataGridHarness extends HarnessBase {
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
      <div className="data-grid-harness">
        {this.renderHeader('dataGrid.title', '^0.0.7', 'dataGrid.description', 'import {DataGrid} from \'ringa-fw-react\'', 'https://github.com/ringa-js/ringa-fw-react/blob/master/src/components/dataGrid/DataGrid.jsx')}
        <Panel label="Basic">
          <CodeExample code={DataGridExample1Code} classes="fill">
            <DataGridExample1 />
          </CodeExample>
        </Panel>
      </div>
    </div>;
  }
}
