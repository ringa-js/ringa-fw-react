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

    return <div className={cn} onClick={this.row_onClickHandler}>
      {super.render(false)}
    </div>;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  row_onClickHandler(event) {
    const {nodeContext} = this.props;

    let rowDimension = nodeContext.parent.dimension;

    if (rowDimension.onClick) {
      rowDimension.onClick(nodeContext, event);
    }
  }
}
