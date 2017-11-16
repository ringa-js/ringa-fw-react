import React from 'react';

import DataGridComponentBase from './DataGridComponentBase';

import DataGridColumnDimension from '../models/DataGridColumnDimension';

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
    const {dataGridModel} = this.state;

    let cn = this.calcClassnames('data-grid-header');

    let columnDimension = dataGridModel.dimensions.find(dimension => dimension instanceof DataGridColumnDimension);

    let HeaderWrapperRenderer = columnDimension.headerWrapperRenderer;

    let headerCells = columnDimension.columns.map(column => {
      let HeaderCellRenderer = column.headerCellRenderer;

      return <HeaderCellRenderer />;
    });

    return <div className={cn}>
      <HeaderWrapperRenderer>
        {headerCells}
      </HeaderWrapperRenderer>
    </div>;
  }
}
