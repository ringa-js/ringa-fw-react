import React from 'react';
import {DataGrid, DataGridModel, RingaComponent, DataGridNumberColumn, DataGridCellRenderer} from '../../../../src/index';

import {numberToColor} from './colorUtil';

let colorLabelFunction = function (data, column, context) {
  let num = column.toRawData(data);
  num = Math.round(0xFFFFFF * (num / 100000));
  return numberToColor(num);
};

class ColorCellRenderer extends DataGridCellRenderer {
  constructor(props) {
    super(props);
  }

  render() {
    let {nodeContext} = this.props;
    let {data, column} = nodeContext;

    let label = column.toLabel(data, nodeContext); // Uses labelFunction defined below

    let cn = this.calcClassnames('data-grid-cell', column.itemCellClasses);

    let background = numberToColor(column.toRawData(data));
    let color = numberToColor(column.toRawData(data), true);

    return <div className={cn} style={{width: column.width, background, color}}>
      {label}
    </div>;
  }
}

export default class DataGridHuge extends RingaComponent {
  constructor() {
    super();

    let items = [];
    items[100000] = 0;

    for (let i = 0; i < 100000; i++) {
      items[i] = {
        col1: i,
        col2: (i + 1000),
        col3: (i + 2000),
        col4: (i + 3000)
      };
    }

    this.dataGridModel = DataGridModel.constructDefaultRowColumnModel([
      new DataGridNumberColumn(),
      {field: 'col1', title: 'Column 1', itemRenderer: ColorCellRenderer, labelFunction: colorLabelFunction},
      {field: 'col2', title: 'Column 2', itemRenderer: ColorCellRenderer, labelFunction: colorLabelFunction},
      {field: 'col3', title: 'Column 3', itemRenderer: ColorCellRenderer, labelFunction: colorLabelFunction}
    ], items);
  }

  render() {
    return <div className="fill">
      <h1>100,000 Items</h1>
      <DataGrid model={this.dataGridModel} classes="fill" />
    </div>;
  }
}
