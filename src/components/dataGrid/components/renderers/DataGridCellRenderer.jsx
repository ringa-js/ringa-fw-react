import React from 'react';

import DataGridComponentBase from '../DataGridComponentBase';

export default class DataGridCellRenderer extends DataGridComponentBase {
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
    let cn = this.calcClassnames('data-grid-cell');

    return <div className={cn}>

    </div>;
  }
}
