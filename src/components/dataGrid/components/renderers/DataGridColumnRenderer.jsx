import React from 'react';

import DataGridComponentBase from "../DataGridComponentBase";

export default class DataGridColumn extends DataGridComponentBase {
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
    let cn = this.calcClassnames('data-grid-column');

    return <div className={cn}>

    </div>;
  }
}
