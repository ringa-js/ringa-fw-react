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
    const {children} = this.props;

    return <div className={this.calcClassnames('ringa-container')}>{children}</div>;
  }
}
