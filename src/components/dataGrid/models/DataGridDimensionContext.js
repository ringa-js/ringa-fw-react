import {Model} from 'ringa';
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
export default class DataGridDimensionContext extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(dimensionIx, items, fieldOrIx, parentModel, name, values) {
    super(name, values);

    this.parentModel = parentModel; // DataGridModel *or* DataGridDimensionModel

    this.dimensionIx = dimensionIx;
    this._items = items;
    this._stack = fieldOrIx ? [fieldOrIx] : [];
  }

  //-----------------------------------
  // Properties
  //-----------------------------------
  get itemsAsArray() {
    return this.dimension.itemsAsArray(this._items);
  }

  get dimension() {
    return this.dataGridModel.dimensions[this.dimensionIx];
  }

  get dataGridModel() {
    if (this.parentModel instanceof DataGridModel) {
      return this.parentModel;
    }

    return this.parentModel.dataGridModel;
  }

  get nextDimension() {
    return this.dataGridModel.dimensions[this.dimensionIx + 1];
  }

  get itemRenderer() {
    return this.dimension.itemRenderer;
  }

  get wrapperRenderer() {
    return this.dimension.wrapperRenderer;
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  cloneAndPush(items, fieldOrIx) {
    let clonee = new DataGridDimensionContext(this.dimensionIx + 1, items, fieldOrIx, this);

    clonee._stack = this._stack.concat([fieldOrIx]);
    clonee._items = items;

    return clonee;
  }

  iterate(callback) {
    this.itemsAsArray.forEach((item, ix) => {
      callback({
        item,
        ix,
        key: ix,
        context: this.cloneAndPush(item, ix),
        itemRenderer: this.itemRenderer
      });
    });
  }
}