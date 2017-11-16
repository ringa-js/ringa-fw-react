import React from 'react';

import DataGridComponentBase from '../DataGridComponentBase';

export default class DataGridColumnHeaderCellRenderer extends DataGridComponentBase {
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
    let cn = this.calcClassnames('data-grid-header-cell');

    return <div className={cn}>

    </div>;
  }
}
