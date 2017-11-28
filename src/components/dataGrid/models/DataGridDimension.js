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

    if (values && values.headerSettings && !(values.headerSettings instanceof DataGridHeaderSettings)) {
      values.headerSettings = new DataGridHeaderSettings(values.headerSettings);
    }

    this.addProperty('headerRenderer');
    this.addProperty('headerSettings', new DataGridHeaderSettings(values ? values.headerSettings : undefined));
    this.addProperty('wrapperRenderer');
    this.addProperty('dimensionRenderer', DataGridDimensionRenderer);
    this.addProperty('itemRenderer', DataGridDimensionRenderer);
    this.addProperty('footerRenderer');

    this.addProperty('scrollable', false);

    this.addProperty('direction', 'vertical');

    this.addProperty('idField', undefined);
    this.addProperty('idFunction', undefined);
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
  index(nodeContext, trie) {
    // To be implemented by subclass
  }

  searchFilter(nodeContext, value) {
    // To be implemented by subclass
  }

  getItemRendererFor(iteratee) {
    // To be implemented by subclass
  }

  getNextDimensionFor(iteratee) {
    // To be implemented by subclass
  }

  getIdFor(rawData) {
    if (this.idFunction) {
      return this.idFunction(rawData, this);
    }

    return this.idField ? rawData[idField] : undefined;
  }

  _buildDataIterator(data, nodeContext) {
    if (data instanceof Array) {
      let ix = 0;

      return {
        next: () => {
          return ix < data.length ? {
            fieldOrIx: ix,
            data: data[ix++],
            id: this.getIdFor(data[ix - 1]) || ix - 1,
            parent: nodeContext
          } : undefined;
        }
      };
    } else if (data instanceof ArrayCollection) {
      let ix = 0;

      return {
        next: () => {
          return ix < data.items.length ? {
            fieldOrIx: ix,
            data: data.items[ix++],
            id: this.getIdFor(data.items[ix - 1]) || ix - 1,
            parent: nodeContext
          } : undefined;
        }
      };
    } else if (typeof data === 'object') {
      console.error('Attempting to build an iterator of an object. Normally you would use DataGridDimensionColumn for this.');
    }

    return {
      next: () => {}
    };
  }

  buildDataIteratorForContext(nodeContext) {
    let {node} = nodeContext;

    return this._buildDataIterator(node, nodeContext);
  }

  buildFilteredDataIteratorForContext(nodeContext) {
    let {childrenFiltered} = nodeContext;

    return this._buildDataIterator(childrenFiltered, nodeContext);
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