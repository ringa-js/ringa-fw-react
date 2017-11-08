import React from 'react';
import RingaComponent from '../RingaComponent';

import TabNavigator from '../containers/TabNavigator';
import Tab from '../containers/Tab';
import Code from './Code';
import Markdown from './Markdown';

import I18NModel from '../../models/I18NModel';

import {depend, dependency} from 'react-ringa';

class CodeExample extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    depend(this, dependency(I18NModel, 'language'));
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {children, code, documentation, i18NKey = 'codeExample.example'} = this.props;
    const {i18NModel} = this.state;

    return <div className={this.calcClassnames("code-example")}>
      <TabNavigator classes="fill">
        <Tab label={i18NModel.i18n(i18NKey)}>
          {children}
        </Tab>
        <Tab label={i18NModel.i18n('codeExample.code')}>
          <Code code={code} classes="fill" />
        </Tab>
      </TabNavigator>
      {documentation ? <Tab label={i18NModel.i18n('codeExample.documentation')}>
        <Markdown markdown={documentation} />
      </Tab> : undefined}
    </div>;
  }
}

export default CodeExample;
