import React from 'react';

import DataGridComponentBase from './DataGridComponentBase';

export default class DataGridHeader extends DataGridComponentBase {
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
    const {context} = this.props;

    let cn = this.calcClassnames('data-grid-header', 'horizontal');

    let columnDimension = context.nextDimension;

    let headerCells = columnDimension.columns.map(column => {
      let HeaderCellRenderer = column.headerCellRenderer;

      return <HeaderCellRenderer key={column.id} column={column} />;
    });

    return <div className={cn}>
      {headerCells}
    </div>;
  }
}
