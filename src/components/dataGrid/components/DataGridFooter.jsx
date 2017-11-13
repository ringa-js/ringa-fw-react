import React from 'react';

import DataGridComponentBase from './DataGridComponentBase';

export default class DataGridFooter extends DataGridComponentBase {
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
    let cn = this.calcClassnames('data-grid-footer');

    return <div className={cn}>

    </div>;
  }
}
