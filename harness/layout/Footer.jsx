import React, { Component } from 'react';

import {RingaComponent} from '../../src/index';
import moment from 'moment';

import './Footer.scss';

class Footer extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render(props) {
    return <header className="app-footer">
      <div className="build">Version {__BUILD__.package.version} built {moment(__BUILD_EPOCH__).fromNow()}</div>
    </header>;
  }
}

export default Footer;
