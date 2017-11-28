import React from 'react';
import RingaComponent from '../RingaComponent';

import TabNavigator from '../containers/TabNavigator';
import Tab from '../containers/Tab';
import Code from './Code';
import Markdown from './Markdown';

import I18NModel from '../../models/I18NModel';

import {dependency} from 'react-ringa';

class CodeExample extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.depend(dependency(I18NModel, 'language'));
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {children, code, documentation, i18NKey = 'codeExample.example'} = this.props;
    const {i18NModel} = this.state;

    return <div className={this.calcClassnames("code-example")}>
      {documentation ? <Markdown markdown={documentation} /> : undefined}
      <TabNavigator classes="fill">
        <Tab label={i18NModel.i18n(i18NKey)}>
          {children}
        </Tab>
        <Tab label={i18NModel.i18n('ringa-fw.codeExample.code')}>
          <Code code={code} classes="fill" />
        </Tab>
      </TabNavigator>
    </div>;
  }
}

export default CodeExample;
