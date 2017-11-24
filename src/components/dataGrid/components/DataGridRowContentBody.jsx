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
    const {children} = this.props;

    const cn = this.calcClassnames('data-grid-row-content-body');

    return <div className={cn}>
      {children}
    </div>;
  }
}
