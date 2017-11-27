import React from 'react';

import DataGridDimensionRenderer from "./DataGridDimensionRenderer";

export default class DataGridRow extends DataGridDimensionRenderer {
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
    const cn = this.calcClassnames('data-grid-row');

    return <div className={cn} style={{height: 30}}>
      {super.render(false)}
    </div>;
  }
}
