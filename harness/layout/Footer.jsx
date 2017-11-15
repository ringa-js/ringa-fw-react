import React, { Component } from 'react';

import {RingaComponent, ScreenModel} from '../../src/index';
import moment from 'moment';

import {dependency} from 'react-ringa';

import './Footer.scss';

class Footer extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    this.depend(dependency(ScreenModel, 'curBreakpointIx'));
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render(props) {
    const {curBreakpointIx} = this.state;

    return <header className="app-footer ringa-container-1">
      {curBreakpointIx > 2 ? <div className="debug">Hold down [ALT]+[SHIFT] keys while moving the mouse to view <a href="/debugInspector">DebugInspector</a>.</div> : undefined}
      <div className="build">Version {__BUILD__.package.version} built {moment(__BUILD_EPOCH__).fromNow()}</div>
    </header>;
  }
}

export default Footer;
