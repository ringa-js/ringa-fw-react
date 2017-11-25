import React from 'react';

import HarnessBase from '../HarnessBase';
import CodeExample from '../../../src/components/complex/CodeExample';
import Panel from '../../../src/components/containers/Panel';

import './DataGridHarness.scss';

import DataGridBasic from './examples/DataGridBasic';
import DataGridBasicCode from './examples/DataGridBasic.txt';

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
          <CodeExample code={DataGridBasicCode} classes="fill">
            <DataGridBasic />
          </CodeExample>
        </Panel>
      </div>
    </div>;
  }
}
