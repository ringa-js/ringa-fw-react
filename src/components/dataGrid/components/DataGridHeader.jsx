import React from 'react';

import DataGridComponentBase from './DataGridComponentBase';

export default class DataGridHeader extends DataGridComponentBase {
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
    let cn = this.calcClassnames('data-grid-header');

    return <div className={cn}>

    </div>;
  }
}
