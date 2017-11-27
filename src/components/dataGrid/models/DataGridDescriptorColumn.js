import {Model} from 'ringa';

import DataGridHeaderCellRenderer from '../components/renderers/DataGridHeaderCellRenderer';
import DataGridDescriptorField from "./DataGridDescriptorField";
import DataGridDimension from "./DataGridDimension";

let camelCaseToTitleCase = function (text) {
  let result = text.replace( /([A-Z])/g, " $1" );
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export default class DataGridDescriptorColumn extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    if (typeof name === 'object') {
      values = name;
      name = undefined;
    }

    if (values && values.field && typeof values.field === 'string'){
      values.field = new DataGridDescriptorField({
        propertyName: values.field,
        title: camelCaseToTitleCase(values.field)
      });
    }

    super(name, values);

    this.addProperty('headerCellRenderer', DataGridHeaderCellRenderer);

    this.addProperty('width');
    this.addProperty('field', {
      type: DataGridDescriptorField
    });

    this.addProperty('headerCellClasses', 'ellipsis');
    this.addProperty('itemCellClasses', 'ellipsis');

    this.addProperty('dimension', undefined, {
      type: DataGridDimension
    });
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  toLabel(item, context) {
    let {labelFunction, propertyName} = this.field;

    return labelFunction ? labelFunction(item, this, context) : item[propertyName];
  }
}