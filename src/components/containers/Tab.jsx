import React from 'react';
import RingaComponent from '../RingaComponent';

class Tab extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);
  }

  //-----------------------------------
  // Properties
  //-----------------------------------
  get label() {
    return this.props.label || '[no label]';
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    const {children} = this.props;

    return <div className={this.calcClassnames("tab-content")}>
      {children}
    </div>;
  }
}

export default Tab;
