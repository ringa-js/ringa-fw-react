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
    let {context, item} = this.props;

    let label = item.column.toLabel(item.object, context);

    let cn = this.calcClassnames('data-grid-cell', item.column.itemCellClasses);

    return <div className={cn} style={{width: item.column.width}}>
      {label}
    </div>;
  }
}
