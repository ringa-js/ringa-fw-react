import {Model} from 'ringa';

import DataGridDimensionRenderer from '../components/DataGridDimensionRenderer';
import {ArrayCollection} from 'ringa-fw-core';
import DataGridHeaderSettings from "./DataGridHeaderSettings";

/**
 * A DataGrid has multiple dimensions. Normally this would just be two:
 *
 * 1) Row
 * 2) Column
 *
 * Where Row is the index of the item in the array and Column is the field within the Object at that index.
 *
 * However, it is quite possible that someone might want to render in Row/Column order or have a third dimension of columns within a cell for example. So we just
 * made it super generic so you can do whatever you want.
 */
export default class DataGridDimension extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    this.addProperty('headerRenderer');
    this.addProperty('headerSettings', new DataGridHeaderSettings());
    this.addProperty('wrapperRenderer');
    this.addProperty('dimensionRenderer', DataGridDimensionRenderer);
    this.addProperty('itemRenderer', DataGridDimensionRenderer);
    this.addProperty('footerRenderer');

    this.addProperty('scrollable', false);

    this.addProperty('direction', 'vertical');

    this.addProperty('filteredItems', []);
  }

  //-----------------------------------
  // Properties
  //-----------------------------------
  get filteredItemsAsArray() {
    return this.filteredItems;
  }

  get itemsAsArray() {
    return this.filteredItems;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  buildDataIteratorForContext(nodeContext) {
    let {node} = nodeContext;

    if (node instanceof Array) {
      let ix = 0;

      return {
        next: () => ({
          fieldOrIx: ix,
          data: node[ix++]
        })
      };
    } else if (node instanceof ArrayCollection) {
      let ix = 0;

      return {
        next: () => ({
          fieldOrIx: ix,
          data: node.items[ix++]
        })
      };
    } else if (typeof node === 'object') {
      console.error('Attempting to build an iterator of an object. Normally you would use DataGridDimensionColumn for this.');
    }

    return {
      next: () => {}
    };
  }

  indexItem(trieSearch, ref) {
    // To be implemented
  }

  clearSearchResults() {
    this.filteredItems = [];
  }

  addSearchResult(ref) {
    this.filteredItems.push(ref);
  }
}