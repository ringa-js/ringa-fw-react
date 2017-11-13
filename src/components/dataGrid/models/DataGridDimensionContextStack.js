import {Model} from 'ringa';

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
export default class DataGridDimensionContextStack extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    this._stack = [];
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  setRootDimension(fieldOrIx) {
    this._stack = [fieldOrIx];
  }

  getValue(array) {

  }

  cloneAndPush(fieldOrIx) {
    let clonee = new DataGridDimensionContextStack();

    clonee._stack = this._stack.concat();

    clonee._stack.push(fieldOrIx);

    return clonee;
  }
}