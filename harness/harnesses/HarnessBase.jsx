import React, { Component } from 'react';

import RingaComponent from '../../src/components/RingaComponent';
import Markdown from '../../src/components/complex/Markdown';
import Code from '../../src/components/complex/Code';
import I18NModel from '../../src/models/I18NModel';

import {depend, dependency} from 'react-ringa';

import './HarnessBase.scss';

class HarnessBase extends RingaComponent {
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
    return <div className={this.calcClassnames('harness-container')}>{this.props.children}</div>;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  renderHeader(titleKey, version, descriptionKey, code, source) {
    const {i18NModel} =  this.state;

    return <div className="header">
      <Markdown markdown={i18NModel.i18n(titleKey)} />
      <div className="since-version">{i18NModel.i18n('harness.sinceVersion')}<span className="version">{version}</span></div>
        <Code code={code} />
      <Markdown markdown={i18NModel.i18n(descriptionKey)} />
      <label><a href={source} target="_blank">{i18NModel.i18n('harness.source')}</a></label>
    </div>;
  }
}

export default HarnessBase;
