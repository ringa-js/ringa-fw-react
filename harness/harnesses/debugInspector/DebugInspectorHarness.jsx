import React from 'react';

import HarnessBase from '../HarnessBase';

import './DebugInspectorHarness.scss';

class DebugInspectorHarness extends HarnessBase {
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
      <div className="debug-inspector-harness">
        {this.renderHeader('debugInspector.title', '^0.1.1', 'debugInspector.description', 'import {DebugInspector} from \'ringa-fw-react\'', 'https://github.com/ringa-js/ringa-fw-react/blob/master/src/components/debugInspector/DebugInspector.jsx')}
      </div>
    </div>;
  }
}

export default DebugInspectorHarness;
