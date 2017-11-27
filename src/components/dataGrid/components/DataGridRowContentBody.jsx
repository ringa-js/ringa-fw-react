import React from 'react';

import DataGridComponentBase from "./DataGridComponentBase";

export default class DataGridRowContentBody extends DataGridComponentBase {
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
    const {children, nodeContext} = this.props;

    const cn = this.calcClassnames('data-grid-row-content-body', {
      scrollable: nodeContext.dimension.scrollable
    });

    return <div className={cn}>
      {children}
    </div>;
  }
}
