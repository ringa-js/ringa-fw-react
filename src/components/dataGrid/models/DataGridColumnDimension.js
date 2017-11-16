import DataGridDimensionBase from './DataGridDimensionBase';
import DataGridHeaderWrapperRenderer from '../components/renderers/DataGridHeaderWrapperRenderer';

export default class DataGridColumnDimension extends DataGridDimensionBase {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name, values) {
    super(name, values);

    this.addProperty('headerWrapperRenderer', DataGridHeaderWrapperRenderer);
    this.addProperty('columns', []);
  }
}