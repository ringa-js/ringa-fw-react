import DataGridDescriptorColumn from "./DataGridDescriptorColumn";

export default class DataGridNumberColumn extends DataGridDescriptorColumn {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    this.width = 60;
    this.title = '#';
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  toLabel(item, context) {
    if (item && context) {
      return (context.parent.fieldOrIx + 1).toString();
    }

    return '';
  }
}