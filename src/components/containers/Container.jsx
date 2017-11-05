import React from 'react';
import RingaComponent from '../RingaComponent';

export default class Container extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {children, classes} = this.props;

    return <div className={this.calcClassnames('ringa-container', classes)}>{children}</div>;
  }
}
