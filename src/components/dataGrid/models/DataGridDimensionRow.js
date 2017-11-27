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
    this.scrollable = true;

    this.addProperty('dimension', undefined, {
      type: DataGridDimension
    });
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  searchFilter(nodeContext, value) {

  }

  getItemRendererFor(iteratee) {
    return this.itemRenderer;
  }

  getNextDimensionFor(ref) {
    return this.dimension; // Well this was simple...
  }

  indexItem(trieSearch, ref) {
    // Row Number -> Next Item
    trieSearch.map((ref.ix + 1).toString(), {
      item: ref.item,
      dimension: this
    });
  }
}