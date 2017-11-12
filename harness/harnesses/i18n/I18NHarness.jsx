import React from 'react';

import HarnessBase from '../HarnessBase';
import CodeExample from '../../../src/components/complex/CodeExample';
import Panel from '../../../src/components/containers/Panel';

import './I18NHarness.scss';

import I18NExample1 from './I18NExample1';
import I18NExample1Code from './I18NExample1.txt';

import I18NExample2 from './I18NExample2';
import I18NExample2Code from './I18NExample2.txt';

import I18NExample3 from './I18NExample3';
import I18NExample3Code from './I18NExample3.txt';

import I18NExample4 from './I18NExample4';
import I18NExample4Code from './I18NExample4.txt';

import I18NExample5 from './I18NExample5';
import I18NExample5Code from './I18NExample5.txt';

class I18NHarness extends HarnessBase {
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
      <div className="i18n-harness">
        {this.renderHeader('i18n.title', '^0.0.12', 'i18n.description', 'import {I18NModel} from \'ringa-fw-react\'', 'https://github.com/ringa-js/ringa-fw-react/blob/master/src/models/I18NModel.js')}
        <Panel label="Populating Languages / Key-Values">
          <CodeExample code={I18NExample1Code} classes="fill">
            <I18NExample1 />
          </CodeExample>
        </Panel>
        <Panel label="Basic Rendering of I18N Keys">
          <CodeExample code={I18NExample2Code} classes="fill">
            <I18NExample2 />
          </CodeExample>
        </Panel>
        <Panel label="Rendering of I18N Keys with Dynamic Injections">
          <CodeExample code={I18NExample3Code} classes="fill">
            <I18NExample3 />
          </CodeExample>
        </Panel>
        <Panel label="I18NSwitcher">
          <CodeExample code={I18NExample4Code} classes="fill">
            <I18NExample4 />
          </CodeExample>
        </Panel>
        <Panel label="Missing Keys Example">
          <CodeExample code={I18NExample5Code} classes="fill">
            <I18NExample5 />
          </CodeExample>
        </Panel>
      </div>
    </div>;
  }
}

export default I18NHarness;
