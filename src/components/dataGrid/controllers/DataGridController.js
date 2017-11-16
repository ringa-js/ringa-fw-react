import {Controller} from 'ringa';
import DataGridModel from '../models/DataGridModel';

export default class DataGridController extends Controller {
  constructor(name, options, dataGridModel) {
    super(name, options);

    this.addModel(dataGridModel || new DataGridModel(),)
  }
}