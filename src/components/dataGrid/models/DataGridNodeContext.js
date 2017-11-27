import DataGridModel from "./DataGridModel";

/**
 * The dimension context is a Stack object that represents the path to the current node in the data.
 *
 * For example, imagine a data set like this for a standard Row (dimension 0) / Column (dimension 1) setup:
 *
 * [{
 *   firstName: 'Josh',
 *   lastName: 'Jung'
 * }, {
 *   firstName: 'Naomi',
 *   lastName: 'Mathews'
 * }, {
 *   firstName: 'Joseph',
 *   lastName: 'Jung'
 * }]
 *
 * If we wanted to access [1]['firstName'], in a standard row/column dimension setup, the stack might look something like:
 *
 * [{
 *   fieldOrIx: 2,
 *   data: {
 *     firstName: 'Josh',
 *     lastName: 'Jung'}
 *   }, {
 *   fieldOrIx: DataGridField(field: 'firstName'),
 *   data: 'Josh'
 * }]
 *
 * This would be the stack to access the
 */
export default class DataGridNodeContext {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(dimension, parent, fieldOrIx) {
    this.dimension = dimension;
    this.parent = parent;
    this.fieldOrIx = fieldOrIx;
    this.isRoot = this.fieldOrIx === undefined;
    this.pathToNode = this.getPathToNode();
    this.node = this.dataGridModel.getNodeByPath(this.pathToNode);
    this.filtered = false; // When true, this node is ignored when rendering, etc.

    this.children = [];

    // Iterate over our data and recursively build the next dimension level
    this.rawDataIterate(ref => {
      let nextDimension = dimension.getNextDimensionFor(ref);

      if (nextDimension) {
        let newNodeContext = new DataGridNodeContext(nextDimension, this, ref.fieldOrIx);

        this.children.push(newNodeContext);
      } else {
        this.children.push(ref);
      }
    });

    this.childrenFiltered = this.children.concat();
  }

  //-----------------------------------
  // Properties
  //-----------------------------------
  get dataGridModel() {
    return this.parent instanceof DataGridModel ? this.parent : this.parent.dataGridModel;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  buildRawDataIterator() {
    return this.dimension.buildDataIteratorForContext(this);
  }

  buildFilteredDataIterator() {
    return this.dimension.buildFilteredDataIteratorForContext(this);
  }

  getPathToNode() {
    if (this.isRoot) {
      return [];
    }

    let p = [this.fieldOrIx];
    let parent = this.parent;

    while (!parent.isRoot) {
      p.unshift(parent.fieldOrIx);
      parent = parent.parent;
    }

    return p;
  }

  cloneAndPush(fieldOrIx) {
    let nextDimension = this.dataGridModel.dimensions[this.dimensionIx + 1];

    return new DataGridDimensionContext(nextDimension, this, fieldOrIx);
  }

  rawDataIterate(callback) {
    let iterator = this.buildRawDataIterator();

    let ref = iterator.next();

    while (ref) {
      callback(ref);

      ref = iterator.next();
    }
  }

  filteredDataIterate(callback) {
    let iterator = this.buildFilteredDataIterator();

    let ref = iterator.next();

    while (ref) {
      callback(ref);

      ref = iterator.next();
    }
  }

  depthFirst(callback, filtered = false) {
    let result = false;
    let items = filtered ? this.filteredNodesAsArray : this.nodesAsArray;

    items.forEach((item, ix) => {
      let nextDepthResult = false;

      if (this.nextDimension) {
        nextDepthResult = this.cloneAndPush(ix, item).depthFirst(callback);
      }

      result = result || callback({
        item,
        ix,
        context: this,
        depth: this.ix
      }, nextDepthResult);
    });

    return result;
  }
}