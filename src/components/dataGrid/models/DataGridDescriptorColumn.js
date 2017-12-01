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
        title: !values.title ? camelCaseToTitleCase(values.field) : undefined
      });
    } else if (values && values.field && typeof values.field === 'object') {
      values.field = new DataGridDescriptorField(values.field);
    }

    super(name, values);

    this.addProperty('headerCellRenderer', DataGridHeaderCellRenderer);

    this.addProperty('width');
    this.addProperty('field', {
      type: DataGridDescriptorField
    });

    this.addProperty('title');
    this.addProperty('titleFunction');

    this.addProperty('labelFunction');

    this.addProperty('headerCellClasses', 'ellipsis');
    this.addProperty('itemCellClasses');
    this.addProperty('itemCellClassesFunction');
    this.addProperty('itemCellLabelClasses', 'ellipsis');

    this.addProperty('dimension', undefined, {
      type: DataGridDimension
    });

    this.addProperty('itemRenderer');
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  toLabel(item, context) {
    let {labelFunction, propertyName} = this.field;

    labelFunction = labelFunction || this.labelFunction;

    let splitter = () => {
      let split = propertyName.split('.');
      let n, obj = item;
      while (split.length) {
        n = split.shift();
        obj = obj[n];
      }
      return obj;
    };

    labelFunction = labelFunction || splitter;

    let label = labelFunction(item, this, context);

    return label !== undefined ? label.toString() : '';
  }

  toRawData(item) {
    let {propertyName} = this.field;

    return item[propertyName];
  }
}