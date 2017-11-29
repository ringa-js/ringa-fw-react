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
    let {column} = this.props;
    let {field} = column;

    let cn = this.calcClassnames('data-grid-header-cell', column.headerCellClasses);

    let title;

    if (column.titleFunction) {
      title = column.titleFunction();
    } else {
      title = column.title || field.title;
    }

    return <div className={cn} style={{width: column.width}}>
      <div className="label">{title}</div>
    </div>;
  }
}
