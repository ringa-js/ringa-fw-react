import React from 'react';
import RingaComponent from '../RingaComponent';

import Code from './Code';

import I18NModel from '../../models/I18NModel';

import {depend} from 'react-ringa';

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
    const {children, code, i18NKey = 'codeExample.example'} = this.props;
    const {i18NModel} = this.state;

    const tabs = [{
      label: i18NModel.i18n(i18NKey),
      content: children
    }, {
      label: i18NModel.i18n('codeExample.code'),
      content: <Code code={code} />
    }];

    return <div className={this.calcClassnames("code-example")}>
      <TabNavigator tabs={tabs} />
    </div>;
  }
}

export default CodeExample;
