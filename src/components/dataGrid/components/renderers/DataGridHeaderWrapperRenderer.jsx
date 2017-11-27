import React from 'react';

import DataGridComponentBase from '../DataGridComponentBase';

export default class DataGridHeaderWrapperRenderer extends DataGridComponentBase {
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
    let cn = this.calcClassnames('data-grid-header-wrapper');

    return <div className={cn}>
      {this.props.children}
    </div>;
  }
}
