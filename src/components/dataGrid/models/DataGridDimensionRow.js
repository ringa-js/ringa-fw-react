import DataGridDimension from './DataGridDimension';

import DataGridHeader from '../components/DataGridHeader';
import DataGridRowContentBody from '../components/DataGridRowContentBody';
import DataGridRow from '../components/DataGridRow';

export default class DataGridDimensionRow extends DataGridDimension {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    this.headerRenderer = DataGridHeader;
    this.wrapperRenderer = DataGridRowContentBody;
    this.itemRenderer = DataGridRow;
    this.direction = 'vertical';
  }
}