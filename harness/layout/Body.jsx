import React, { Component } from 'react';
import BodyClassName from 'react-body-classname';

import './Body.scss';

export default class Body extends Component {
  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    return <BodyClassName className="body">
            { this.props.children }
          </BodyClassName>;
  }
}
