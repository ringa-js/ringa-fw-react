import React from 'react';

import DataGridComponentBase from "./DataGridComponentBase";

export default class DataGridRow extends DataGridComponentBase {
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
    const {children, context} = this.props;

    const cn = this.calcClassnames('data-grid-row-content-body', {
      scrollable: context.dimension.scrollable
    });

    return <div className={cn}>
      {children}
    </div>;
  }
}
