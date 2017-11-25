import {Model} from 'ringa';

import {ArrayCollection} from 'ringa-fw-core';

import TrieSearch from 'trie-search';

import DataGridDimension from './DataGridDimension';
import DataGridDimensionRow from './DataGridDimensionRow';
import DataGridDimensionColumn from './DataGridDimensionColumn';
import DataGridDescriptorColumn from './DataGridDescriptorColumn';
import DataGridNodeContext from './DataGridNodeContext';

export default class DataGridModel extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    this.addProperty('dimensions', [], {
      type: DataGridDimension
    });

    this.addProperty('items', undefined, {
      type: ArrayCollection,
      onChange: () => this.items_changedHandler
    });

    this.addProperty('autoIndex', true);

    if (this.autoIndex && this.items) {
      this.index();
    }
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  index() {
    this.trieSearch = new TrieSearch();

    this.depthFirst(ref => {
      ref.context.dimension.indexItem(this.trieSearch, ref);
    });
  }

  search(value) {
    this.searchText = value;

    this.dimensions.forEach(dimension => {
      dimension.clearSearchResults();
    });

    this.trieSearch.get(this.searchText).forEach(ref => {
      ref.dimension.addSearchResult(ref);
    });

    this.notify('change');
  }

  rebuildNodeContext() {
    this.nodeContext = new DataGridNodeContext(this.dimensions[0], this);

    this.notify('change');
  }

  depthFirst(callback) {
    this.nodeContext.depthFirst(callback);
  }

  getNodeByPath(path) {
    let obj = undefined;
    let node = this.items.items;

    try {
      while (path.length) {
        obj = node[path.shift()];
      }
    } catch (error) {
      console.error(`DataGridModel: could not find object via path ${path.join(',')}`);

      return undefined;
    }

    return obj;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  items_changedHandler() {
    this.autoIndex ? this.index() : undefined;

    this.rebuildNodeContext();
  }

  //-----------------------------------
  // Statics
  //-----------------------------------
  static constructDefaultRowColumnModel(columns, data) {
    let finalItems;

    if (data) {
      if (data instanceof ArrayCollection) {
        finalItems = data;
      } else {
        finalItems = new ArrayCollection({data});
      }
    }

    return new DataGridModel({
      dimensions: [
        new DataGridDimensionRow(),
        new DataGridDimensionColumn({columns: columns.map(column => new DataGridDescriptorColumn(column))})
      ],
      items: finalItems
    });
  }
}