import React from 'react';
import {DataGrid, DataGridModel, RingaComponent} from '../../../../src/index';

class DataGridExample1 extends RingaComponent {
  constructor() {
    super();

    const items = [
      {
        firstName: 'Josh',
        lastName: 'Jung',
        email: 'somebody@gmail.com'
      },
      {
        firstName: 'Noami',
        lastName: 'Mathews',
        email: 'nobody@gmail.com'
      },
      {
        firstName: 'Alexander',
        lastName: 'Selling',
        email: 'whoever@gmail.com'
      }
    ];

    this.dataGridModel = DataGridModel.constructDefaultRowColumnModel([
      {field: 'firstName'},
      {field: 'lastName'},
      {field: 'email'}
    ], items);
  }

  render() {
    return <DataGrid model={this.dataGridModel} classes="fill" />;
  }
}

export default DataGridExample1;
