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

    return <div className={cn} style={{width: column.width}}>
      <div className="label">{field.title}</div>
    </div>;
  }
}
