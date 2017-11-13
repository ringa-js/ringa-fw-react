import React from 'react';

import DataGridComponentBase from './DataGridComponentBase';

export default class DataGridBody extends DataGridComponentBase {
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
    let cn = this.calcClassnames('data-grid-body');
    let {dataGridModel} = this.state;

    return <div className={cn}>

    </div>;
  }
}
