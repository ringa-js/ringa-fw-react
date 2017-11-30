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

    this.dataGridModel.assignNextContextId(this);

    this.fieldOrIx = fieldOrIx;
    this.isRoot = this.fieldOrIx === undefined;
    this.pathToNode = this.getPathToNode();
    /**
     * Node contains raw data (e.g. a row within the original array of data.
     */
    this.node = this.dataGridModel.getNodeByPath(this.pathToNode);

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
  get filtered() {
    return this.childrenFiltered.length === 0;
  }

  get dataGridModel() {
    return this.parent instanceof DataGridModel ? this.parent : this.parent.dataGridModel;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  index(trie) {
    this.dimension.index(this, trie);
  }

  searchFilter(value) {
    this.childrenFiltered = this.children.filter(nodeContext => {
      // Calling searchFilter is depth-first. As a result, our children have already had
      // searchFilter called on all of them. So if a child says it is *not* filtered, then
      // we know for sure that we need to display ourselves.
      if (nodeContext.filtered === false) {
        return true;
      }

      return this.dimension.searchFilter(nodeContext, value);
    });
  }

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

  depthFirst(callback) {
    this.children.forEach(nodeContext => {
      if (nodeContext.depthFirst) {
        nodeContext.depthFirst(callback);
      } else if (nodeContext.children) {
        nodeContext.children.forEach(callback);
      }
    });

    callback(this);
  }

  clearFilter() {
    this.childrenFiltered = this.children.concat();
  }

  filterToContextIds(contextsById) {
    this.included = false;

    let includeAllChildren = true;

    let dgm = this.dataGridModel;

    for (let i = 0; i < this.children.length; i++) {
      let childNodeContext = this.children[i];

      if (childNodeContext.filterToContextIds) {
        includeAllChildren = false;

        childNodeContext.filterToContextIds(contextsById);
      } else {
        break;
      }
    }

    this.included = this.included || !!contextsById[this.id];

    if (this.included) {
      let p = this.parent;

      while (p !== dgm) {
        p.included = true;
        p = p.parent;
      }
    }

    this.childrenFiltered = includeAllChildren ?
      this.children.concat() :
      this.children.filter(childNodeContext => childNodeContext.included);
  }
}